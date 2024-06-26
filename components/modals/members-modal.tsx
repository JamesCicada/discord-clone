"use client";
import axios from "axios";

import qs from "query-string"

import { Check, CrownIcon, Gavel, Loader2, MoreVertical, ShieldCheck, ShieldQuestion, User } from "lucide-react";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserAvatar } from "@/components/user-avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

import { ServerWithMemberWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import { useRouter } from "next/navigation";

const roleMap = {
  GUEST: <User className="h-4 w-4 ml-2 text-indigo-500" />,
  MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-emerald-500" />,
  ADMIN: <CrownIcon className="h-4 w-4 ml-2 text-yellow-500" />,
};

export const MembersModal = () => {
    const router = useRouter()
  const { onOpen, isOpen, onClose, type, data } = useModal();

  const [loadingId, setLoadingId] = useState("");

  const isModalOpen = isOpen && type === "members";

  const { server } = data as { server: ServerWithMemberWithProfiles };

    const onRoleChange = async (memberId: string, role: MemberRole) =>{
        try {
            setLoadingId(memberId)
            const url = qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query: {
                    serverId: server?.id
                }
            })
            const response = await axios.patch(url, {
                role
            })
            router.refresh()
            onOpen("members", {server: response.data})
        } catch (err) {
            console.log(err);
        } finally {
            setLoadingId("")
        }
    }
    const onKick = async (memberId: string) => {
        try {
          setLoadingId(memberId);
          const url = qs.stringifyUrl({
            url: `/api/members/${memberId}`,
            query: {
              serverId: server?.id,
            },
          });
    
          const response = await axios.delete(url);
    
          router.refresh();
          onOpen("members", { server: response.data });
        } catch (err) {
          console.log(err);
        } finally {
          setLoadingId("");
        }
      }
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-center text-2xl font-bold">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {server?.members?.length} Members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {server?.members?.map((m) => (
            <div key={m.id} className="flex items-center gap-x-2 mb-6">
              <UserAvatar src={m.profile.imageUrl} />
              <div className="flex flex-col  gap-y-1">
                <div className="text-xs font-semibold flex items-center gap-x-1">
                  {m.profile.name}
                  {roleMap[m.role]}
                </div>
                <p className="text-xs text-zinc-500">{m.role.toUpperCase()}</p>
              </div>
              {server.profileId !== m.profileId && loadingId !== m.id && (
                <div className="ml-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical className="h-4 w-4 text-zinc-500" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="left">
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger className="flex items-center">
                                <ShieldQuestion className="h-4 w-4 mr-2" />
                                <span>Role</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem onClick={() => onRoleChange(m.id, "GUEST")}>
                                        <User className="h-4 w-4 mr-2" />
                                        Guest
                                        {m.role == 'GUEST' && (
                                            <Check className="h-4 w-4 ml-auto"/>
                                        )}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => onRoleChange(m.id, "MODERATOR")}>
                                        <ShieldCheck className="h-4 w-4 mr-2" />
                                        Mod
                                        {m.role == 'MODERATOR' && (
                                            <Check className="h-4 w-4 ml-auto"/>
                                        )}
                                    </DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={()=>onKick(m.id)} className="text-rose-500">
                            <Gavel className="h-4 w-4 mr-2"/>
                            Kick
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
              { loadingId === m.id && (
                <Loader2 className="animate-spin text-zinc-500 ml-auto w-4 h-4"/>
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
