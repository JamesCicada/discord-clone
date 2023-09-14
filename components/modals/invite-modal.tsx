"use client";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useModal } from "@/hooks/use-modal-store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";


export const InviteModal = () => {
    const { onOpen ,isOpen, onClose, type, data} = useModal()
    const origin = useOrigin()

  const isModalOpen = isOpen && type === "invite"; 

  const {server} = data

  const [copied, setCopied] = useState(false)
  const [isLoading, setIsloading] = useState(false)

  const inviteUrl = `${origin}/${server?.inviteCode}`

  const onCopy = () =>{
    navigator.clipboard.writeText(inviteUrl)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1000);
  }

  const onNew = async () =>{
    try {
      setIsloading(true)
      const response = await axios.patch(`/api/servers/${server?.id}/invite-code`)

      onOpen("invite", {server: response.data})
    } catch (err) {
      console.log(err);
    } finally{
      setIsloading(false)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-center text-2xl font-bold">
            Invite Members
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
            <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70" >
                Server Invite link
            </Label>
            <div className="flex items-center mt-2 gap-x-2">
                <Input disabled={isLoading} value={inviteUrl} className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0" />
                <Button disabled={isLoading} onClick={onCopy} size="icon">
                    {copied ? <ClipboardCheck className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    
                </Button>
            </div>
            <Button onClick={onNew} disabled={isLoading} variant="green" size="sm" className="text-xs text-zin-500 mt-4">
                Generate a New Link
                <RefreshCw className="h-4 w-4 ml-2" />
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
