"use server";

import { prisma } from "@/app/lib/prisma";

export async function getTransmissions() {
  try {
    const transmissions = await prisma.transmission.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
      include: {
        subject: {
          select: { subjectId: true, division: true },
        },
      },
    });
    return transmissions;
  } catch {
    return [];
  }
}

export async function postTransmission(
  content: string,
  subjectDbId?: string,
  txSignature?: string,
  walletAddress?: string
) {
  if (!content || content.trim().length === 0 || content.length > 280) {
    return { error: "Invalid content" };
  }

  try {
    const transmission = await prisma.transmission.create({
      data: {
        content: content.trim(),
        subjectId: subjectDbId || null,
        txSignature: txSignature || null,
        walletAddress: walletAddress || null,
      },
      include: {
        subject: {
          select: { subjectId: true, division: true },
        },
      },
    });
    return { transmission };
  } catch {
    return { error: "Failed to post transmission" };
  }
}

export async function getSubjectBySubjectId(subjectId: string) {
  try {
    const subject = await prisma.subject.findUnique({
      where: { subjectId },
    });
    return subject;
  } catch {
    return null;
  }
}
