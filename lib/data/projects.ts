import "server-only";

import { prisma } from "@/lib/db/client";

export async function getAdminProjects() {
  return prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      proposal: {
        select: {
          id: true,
          currency: true,
          brief: {
            select: {
              title: true,
              pillar: true,
            },
          },
        },
      },
    },
  });
}

export async function getAdminProjectById(projectId: string) {
  return prisma.project.findUnique({
    where: {
      id: projectId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          companyName: true,
        },
      },
      proposal: {
        include: {
          brief: true,
        },
      },
      milestones: {
        orderBy: {
          sortOrder: "asc",
        },
      },
      invoices: {
        orderBy: {
          createdAt: "desc",
        },
      },
      files: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
}
