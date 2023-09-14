import { currentProfil } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfil();

    const { name, imageUrl } = await req.json();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!params.serverId) {
      return new NextResponse("Server ID Missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        name,
        imageUrl,
      },
    });
    if(!server) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    return NextResponse.json(server);
  } catch (err) {
    console.log("[SERVER_ID_PATCH]", err);
    return new NextResponse("Internal Err", { status: 500 });
  }
}
