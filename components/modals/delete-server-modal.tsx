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
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";


export const DeleteServerModal = () => {
    const { isOpen, onClose, type, data} = useModal()

  const isModalOpen = isOpen && type === "deleteServer"; 
const router = useRouter()
  const {server} = data
  const [isLoading, setIsloading] = useState(false)
const onClick = async () =>{
    try {
        setIsloading(true)

        await axios.delete(`/api/servers/${server?.id}`)

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
            Delete Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you wanna Delete <span className="font-semibold text-indigo-500">{server?.name}</span>?
            <br />
            This Action cannot be reverted!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
            <div className="flex items-center justify-between w-full">
                <Button disabled={isLoading} onClick={onClose} variant="ghost">
                    Cancel
                </Button>
                <Button disabled={isLoading} onClick={onClick} variant="danger">
                    Delete
                    <Trash className="h-4 v-4 ml-2"/>
                </Button>

            </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
