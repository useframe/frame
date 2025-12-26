"use client";

import React, { useEffect, useRef } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import ProjectMessageCard from "./project-message-card";
import ProjectMessageForm from "./project-message-form";
import { Fragment } from "@/generated/prisma/client";
import ProjectMessageLoading from "./project-message-loading";

interface ProjectMessagesContainerProps {
  projectId: string;
  activeFragment: Fragment | null;
  setActiveFragment: (fragment: Fragment) => void;
}

const ProjectMessagesContainer = ({
  projectId,
  activeFragment,
  setActiveFragment,
}: ProjectMessagesContainerProps) => {
  const trpc = useTRPC();
  const bottomRef = useRef<HTMLDivElement>(null);

  const { data: messages } = useSuspenseQuery(
    trpc.messages.getMessages.queryOptions(
      { projectId },
      {
        refetchInterval: 5000,
      }
    )
  );

  useEffect(() => {
    const lastAssistantMessage = messages.findLast(
      (message) => message.role === "ASSISTANT"
    );

    if (lastAssistantMessage && lastAssistantMessage.fragment) {
      setActiveFragment(lastAssistantMessage.fragment);
    }
  }, [messages, setActiveFragment]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const lastMessage = messages[messages.length - 1];
  const isLastMessageUser = lastMessage?.role === "USER";

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="pt-2 pr-1">
          {messages.map((message) => (
            <ProjectMessageCard
              key={message.id}
              role={message.role}
              type={message.type}
              content={message.content}
              fragment={message.fragment}
              createdAt={message.createdAt}
              updatedAt={message.updatedAt}
              isActive={activeFragment?.id === message.fragment?.id}
              onFragmentClick={setActiveFragment}
            />
          ))}
          {isLastMessageUser && <ProjectMessageLoading />}
          <div ref={bottomRef} />
        </div>
      </div>
      <div className="relative p-3 pt-1">
        <div className="absolute -top-6 left-0 right-0 h-6 bg-linear-to-b from-transparent to-background pointer-events-none" />
        <ProjectMessageForm projectId={projectId} />
      </div>
    </div>
  );
};

export default ProjectMessagesContainer;
