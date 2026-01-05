import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";

import ProjectView from "@/modules/projects/components/project-view";

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
      <ErrorBoundary fallback={<div>Error: Failed to load project</div>}>
        <Suspense fallback={<div>Loading Projects...</div>}>
          <ProjectView projectId={projectId} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
};

export default Project;
