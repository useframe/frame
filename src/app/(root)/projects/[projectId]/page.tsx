import ProjectView from "@/modules/projects/components/project-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface ProjectProps {
  params: Promise<{
    projectId: string;
  }>;
}

const Project = async ({ params }: ProjectProps) => {
  const { projectId } = await params;
  const queryClient = getQueryClient();
  await Promise.all([
    queryClient.prefetchQuery(
      trpc.messages.getMessages.queryOptions({ projectId })
    ),
    queryClient.prefetchQuery(
      trpc.projects.getProjectById.queryOptions({ id: projectId })
    ),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading Projects...</div>}>
        <ProjectView projectId={projectId} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Project;
