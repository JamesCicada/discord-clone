"use client";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useModal } from "@/hooks/use-modal-store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { redirect, useRouter } from "next/navigation";


export const LeaveServerModal = () => {
    const { isOpen, onClose, type, data} = useModal()

  const isModalOpen = isOpen && type === "leaveServer"; 
const router = useRouter()
  const {server} = data
  const [isLoading, setIsloading] = useState(false)
const onClick = async () =>{
    try {
        setIsloading(true)

        await axios.patch(`/api/servers/${server?.id}/leave`)

        onClose()
        router.refresh()
        router.push('/')    
    } catch (err) {
        console.log(err);
    } finally {
        setIsloading(false)
    }
}
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-center text-2xl font-bold">
            Leave Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you wanna leave <span className="font-semibold text-indigo-500">{server?.name}</span>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
            <div className="flex items-center justify-between w-full">
                <Button disabled={isLoading} onClick={onClose} variant="ghost">
                    Cancel
                </Button>
                <Button disabled={isLoading} onClick={onClick} variant="danger">
                    Leave
                    <LogOut className="h-4 v-4 ml-2"/>
                </Button>

            </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
