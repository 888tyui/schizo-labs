import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { subjectId, division, answers, walletAddress } = body;

    if (!subjectId || !division || !answers) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existing = await prisma.subject.findUnique({
      where: { subjectId },
    });

    if (existing) {
      return NextResponse.json({ subject: existing });
    }

    const subject = await prisma.subject.create({
      data: {
        subjectId,
        division,
        answers,
        ...(walletAddress && { walletAddress }),
      },
    });

    return NextResponse.json({ subject });
  } catch {
    return NextResponse.json(
      { error: "Failed to save initiation" },
      { status: 500 }
    );
  }
}
