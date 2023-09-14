import { currentProfil } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { memberId: string } }
) {
    try {
        const profile = await currentProfil();
        const { searchParams } = new URL(req.url);
        const { role } = await req.json();
    
        const serverId = searchParams.get("serverId");
    
        if (!profile) {
          return new NextResponse("Unauthorized", { status: 401 });
        }
    
        if (!serverId) {
          return new NextResponse("Server ID Missing", { status: 400 });
        }
    
        if (!params.memberId) {
          return new NextResponse("Member ID Missing", { status: 400 });
        }
    
        const server = await db.server.update({
          where: {
            id: serverId,
            profileId: profile.id,
          },
          data: {
            members: {
              deleteMany: {
                id: params.memberId,
                profileId: {
                    not: profile.id
                }
              },
            },
          },
          include: {
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
          return new NextResponse("Unauthorized", { status: 401 });
        }
        return NextResponse.json(server);
      } catch (err) {
        console.log("[MEMBER_ID_DELETE]", err);
        return new NextResponse("Internal Err", { status: 500 });
      } 
}

export async function PATCH(
  req: Request,
  { params }: { params: { memberId: string } }
) {
  try {
    const profile = await currentProfil();
    const { searchParams } = new URL(req.url);
    const { role } = await req.json();

    const serverId = searchParams.get("serverId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Server ID Missing", { status: 400 });
    }

    if (!params.memberId) {
      return new NextResponse("Member ID Missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: params.memberId,
              profileId: {
                not: profile.id,
              },
            },
            data: {
              role: role,
            },
          },
        },
      },
      include: {
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
      return new NextResponse("Unauthorized", { status: 401 });
    }
    return NextResponse.json(server);
  } catch (err) {
    console.log("[MEMBER_ID_PATCH]", err);
    return new NextResponse("Internal Err", { status: 500 });
  }
}
