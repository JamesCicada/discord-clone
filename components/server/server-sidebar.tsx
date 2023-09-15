import { currentProfil } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { redirect } from "next/navigation";

import { ServerHeader } from "./server-header";
import { ServerSearch } from "./server-search";
import { ServerSection } from "./server-section";
import { ServerChannel } from "./server-channel";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ChannelType, MemberRole } from "@prisma/client";
import {
  Crown,
  Hash,
  Headphones,
  ShieldCheck,
  User,
  Video,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { ServerMember } from "./server-member";

interface ServerSidebarProps {
  serverId: string;
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className="h-4 w-4 mr-2" />,
  [ChannelType.AUDIO]: <Headphones className="h-4 w-4 mr-2" />,
  [ChannelType.VIDEO]: <Video className="h-4 w-4 mr-2" />,
};
const roleIconMap = {
  [MemberRole.GUEST]: <User className="h-4 w-4 mr-2 text-zinc-500" />,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <Crown className="h-4 w-4 mr-2 text-yellow-500" />,
};

export const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await currentProfil();

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });
  if (!server) {
    return redirect("/");
  }
  const members = server?.members.filter((m) => m.profileId !== profile?.id);
  const textChannels = server?.channels.filter((ch) => ch.type === "TEXT");
  const audioChannels = server?.channels.filter((ch) => ch.type === "AUDIO");
  const videoChannels = server?.channels.filter((ch) => ch.type === "VIDEO");

  const role = server.members.find(
    (member) => member.profileId === profile?.id
  )?.role;

  if (!profile) {
    return redirect("/");
  }
  return (
    <div className="flex flex-col text-primary h-full w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader server={server} role={role} />
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                label: "Text Channels",
                type: "channel",
                data: textChannels?.map((ch) => ({
                  id: ch.id,
                  name: ch.name,
                  icon: iconMap[ch.type],
                })),
              },
              {
                label: "Voice Channels",
                type: "channel",
                data: audioChannels?.map((ch) => ({
                  id: ch.id,
                  name: ch.name,
                  icon: iconMap[ch.type],
                })),
              },
              {
                label: "Video Channels",
                type: "channel",
                data: videoChannels?.map((ch) => ({
                  id: ch.id,
                  name: ch.name,
                  icon: iconMap[ch.type],
                })),
              },
              {
                label: "Members",
                type: "member",
                data: members?.map((m) => ({
                  id: m.id,
                  name: m.profile.name,
                  icon: roleIconMap[m.role],
                })),
              },
            ]}
          />
        </div>
        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md  my-2" />

        {!!textChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.TEXT}
              role={role}
              label="Text Channels"
            />
            <div className="space-y-[2px]">
              {textChannels.map((ch) => (
                <ServerChannel
                  key={ch.id}
                  channel={ch}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}

        {!!audioChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.AUDIO}
              role={role}
              label="Voice Channels"
            />
            <div className="space-y-[2px]">
              {audioChannels.map((ch) => (
                <ServerChannel
                  key={ch.id}
                  channel={ch}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}

        {!!videoChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.VIDEO}
              role={role}
              label="Video Channels"
            />
            <div className="space-y-[2px]">
              {videoChannels.map((ch) => (
                <ServerChannel
                  key={ch.id}
                  channel={ch}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}

        {!!members?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="members"
              role={role}
              label="Members"
              server={server}
            />
            <div className="space-y-[2px]">
              {members.map((mem) => (
                <ServerMember key={mem.id} member={mem} server={server} />
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
