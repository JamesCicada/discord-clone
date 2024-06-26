import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { InitialModal } from "@/components/modals/initial";
import { UserButton } from "@clerk/nextjs";
// import { useState, useEffect } from 'react'
const SetupPage = async () => {
  const profile = await initialProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return (
    <div>
      <UserButton />
      <InitialModal />
    </div>
  );
};

export default SetupPage;
