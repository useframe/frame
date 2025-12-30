import {
  Prisma,
  PrismaClient,
  MessageRole,
  MessageType,
} from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const projectData: Prisma.ProjectCreateInput[] = [
  {
    name: "Sample Project",
    description: "A sample project for testing",
    messages: {
      create: [
        {
          content: "Hello, this is a test message",
          role: MessageRole.USER,
          type: MessageType.RESULT,
        },
        {
          content: "This is a response message",
          role: MessageRole.ASSISTANT,
          type: MessageType.RESULT,
        },
      ],
    },
  },
];

console.log("🌱 Starting seed...");

try {
  for (const project of projectData) {
    // Check if project already exists by name
    const existingProject = await prisma.project.findFirst({
      where: {
        name: project.name,
      },
    });

    if (existingProject) {
      console.log(`⏭️  Project ${project.name} already exists, skipping...`);
      continue;
    }

    // Create new project with messages
    const createdProject = await prisma.project.create({
      data: project,
    });

    console.log(`✅ Project ${createdProject.name} seeded`);
  }

  console.log("✨ Seed completed successfully!");
} catch (error) {
  console.error("❌ Error seeding database:", error);
  throw error;
} finally {
  await prisma.$disconnect();
}
