"use client";
import { Badge } from "@/components/ui/badge";
import { useSocket } from "@/components/providers/socket-provider";
import { Circle } from "lucide-react";

export const SocketIndicator = () => {
  const { isConnected } = useSocket();

  return (
    <Badge
      variant="outline"
      className={`text-white border-none ${
        isConnected
          ? "bg-emerald-600"
          : "bg-yellow-600"
      }`}
    >
      {/* {isConnected ? (
        <>
          <Circle className="inline-block mr-1" />
        </>
      ) : (
        <>
          <Circle className="inline-block mr-1" />
        </>
      )} */}
    </Badge>
  );
};
