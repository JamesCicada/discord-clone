import { currentProfil } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { redirect } from "next/navigation";
import { ServerHeader } from "./server-header";

interface ServerSidebarProps {
  serverId: string;
}

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
    if(!server){
        return redirect('/')
    }
  const textChannels = [];
  const audioChannels = [];
  const videoChannels = [];
  server?.channels.forEach((ch) => {
    if (ch.type === "AUDIO") {
      audioChannels.push(ch);
    } else if (ch.type === "TEXT") {
      textChannels.push(ch);
    } else if (ch.type === "VIDEO") {
      videoChannels.push(ch);
    }
  });
  const members = server?.members.filter((m) => m.profileId !== profile?.id);

  const role = server.members.find((member) => member.profileId === profile?.id)?.role;



  if (!profile) {
    return redirect("/");
  }
  return <div className="flex flex-col text-primary h-full w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
    <ServerHeader server={server} role={role}/>

  </div>;
};
