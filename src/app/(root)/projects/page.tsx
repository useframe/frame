"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import {
  MoreVertical,
  Trash2,
  ExternalLink,
  FolderOpen,
  Plus,
  Loader2,
  AlertCircle,
  Box,
} from "lucide-react";

import { useTRPC } from "@/trpc/client";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from "@/components/ui/empty";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

type Project = {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  messages: { content: string }[];
};

function ProjectSkeleton() {
  return (
    <div className="flex items-center justify-between py-4 px-4 border-b border-border/50 last:border-b-0">
      <div className="flex-1 min-w-0 space-y-2">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="flex items-center gap-3">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  onDelete,
}: {
  project: Project;
  onDelete: (id: string) => void;
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const firstMessage = project.messages?.[0]?.content;
  const displayName = project.name || "Untitled Project";
  const timeAgo = formatDistanceToNow(new Date(project.updatedAt), {
    addSuffix: true,
  });

  return (
    <>
      <Link
        href={`/projects/${project.id}`}
        className={cn(
          "group flex items-center justify-between py-4 px-4 border-b border-border/50 last:border-b-0",
          "hover:bg-muted/50 transition-colors cursor-pointer"
        )}
      >
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-foreground truncate">
              {firstMessage
                ? firstMessage.length > 60
                  ? `${firstMessage.slice(0, 60)}...`
                  : firstMessage
                : displayName}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">Opened {timeAgo}</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Badge
            variant="outline"
            className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
          >
            Ready
          </Badge>

          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
              <Button
                variant="ghost"
                size="icon-sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="size-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href={`/projects/${project.id}`}>
                  <ExternalLink className="size-4" />
                  Open Project
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={(e) => {
                  e.preventDefault();
                  setShowDeleteDialog(true);
                }}
              >
                <Trash2 className="size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Link>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete project?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete &ldquo;{displayName}&rdquo; and all
              its messages. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onDelete(project.id)}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function CreateProjectForm({ onSuccess }: { onSuccess: () => void }) {
  const trpc = useTRPC();
  const router = useRouter();
  const [value, setValue] = useState("");

  const createProject = useMutation(
    trpc.projects.create.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: (data) => {
        onSuccess();
        router.push(`/projects/${data.id}`);
      },
    })
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) {
      toast.error("Please enter a project description");
      return;
    }
    createProject.mutate({ value: value.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Describe what you want to build..."
        disabled={createProject.isPending}
        className="flex-1"
      />
      <Button type="submit" disabled={createProject.isPending || !value.trim()}>
        {createProject.isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Creating...
          </>
        ) : (
          <>
            <Plus className="size-4" />
            Create
          </>
        )}
      </Button>
    </form>
  );
}

export default function ProjectsPage() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [showCreateForm, setShowCreateForm] = useState(false);

  const {
    data: projects,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(trpc.projects.getProjects.queryOptions());

  const deleteProject = useMutation(
    trpc.projects.delete.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: () => {
        toast.success("Project deleted successfully");
        queryClient.invalidateQueries({
          queryKey: trpc.projects.getProjects.queryKey(),
        });
      },
    })
  );

  const handleDelete = (id: string) => {
    deleteProject.mutate({ id });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Your Projects</h1>
            <p className="text-muted-foreground mt-1">
              Continue working on your recent projects
            </p>
          </div>
          <Button onClick={() => setShowCreateForm(!showCreateForm)}>
            <Plus className="size-4" />
            New Project
          </Button>
        </div>

        {/* Create Form */}
        {showCreateForm && (
          <div className="mb-8 p-4 rounded-lg border border-border bg-card">
            <h2 className="text-sm font-medium mb-3 text-muted-foreground">
              Create a new project
            </h2>
            <CreateProjectForm onSuccess={() => setShowCreateForm(false)} />
          </div>
        )}

        {/* Content */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          {/* Loading State */}
          {isLoading && (
            <div>
              {Array.from({ length: 5 }).map((_, i) => (
                <ProjectSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Error State */}
          {isError && (
            <Empty className="py-16">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <AlertCircle className="text-destructive" />
                </EmptyMedia>
                <EmptyTitle>Failed to load projects</EmptyTitle>
                <EmptyDescription>
                  {error?.message || "Something went wrong. Please try again."}
                </EmptyDescription>
              </EmptyHeader>
              <Button onClick={() => refetch()} variant="outline">
                Try Again
              </Button>
            </Empty>
          )}

          {/* Empty State */}
          {!isLoading && !isError && projects?.length === 0 && (
            <Empty className="py-16">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <FolderOpen />
                </EmptyMedia>
                <EmptyTitle>No projects yet</EmptyTitle>
                <EmptyDescription>
                  Get started by creating your first project. Describe what you
                  want to build and let AI help you create it.
                </EmptyDescription>
              </EmptyHeader>
              <Button onClick={() => setShowCreateForm(true)}>
                <Plus className="size-4" />
                Create Your First Project
              </Button>
            </Empty>
          )}

          {/* Projects List */}
          {!isLoading && !isError && projects && projects.length > 0 && (
            <div>
              <div className="px-4 py-3 border-b border-border bg-muted/30">
                <p className="text-sm text-muted-foreground">
                  {projects.length} project{projects.length !== 1 ? "s" : ""}
                </p>
              </div>
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project as Project}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        {!isLoading && !isError && projects && projects.length > 0 && (
          <div className="mt-8 flex items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Press{" "}
              <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded border border-border">
                ⌘
              </kbd>{" "}
              +{" "}
              <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded border border-border">
                N
              </kbd>{" "}
              to create a new project
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
