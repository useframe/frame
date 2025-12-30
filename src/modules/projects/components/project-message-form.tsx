import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowUpIcon, Loader2Icon } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";

const projectMessageFormSchema = z.object({
  value: z
    .string()
    .min(1, { message: "Value is required" })
    .max(10000, { message: "Value is too long" }),
});

type ProjectMessageFormType = z.infer<typeof projectMessageFormSchema>;

interface ProjectMessageFormProps {
  projectId: string;
}

const ProjectMessageForm = ({ projectId }: ProjectMessageFormProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const form = useForm<ProjectMessageFormType>({
    resolver: zodResolver(projectMessageFormSchema),
    defaultValues: {
      value: "",
    },
  });

  const { mutate: createMessage, isPending } = useMutation(
    trpc.messages.create.mutationOptions({
      onSuccess: () => {
        form.reset();
        queryClient.invalidateQueries(
          trpc.messages.getMessages.queryOptions({ projectId })
        );
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const onSubmit = (data: ProjectMessageFormType) => {
    createMessage({
      projectId,
      value: data.value,
    });
  };

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const isButtonDisabled = isPending || !form.formState.isValid;
  const showUsage = false;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "relative border p-4 pt-1 rounded-xl bg-sidebar dark:bg-sidebar transition-all",
          isFocused && "shadow-xs",
          showUsage && "rounded-t-none"
        )}
      >
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TextareaAutosize
                  {...field}
                  minRows={2}
                  maxRows={8}
                  placeholder="What would you like to build?"
                  className="pt-4 resize-none border-none w-full outline-none bg-transparent"
                  disabled={isPending}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      form.handleSubmit(onSubmit)(e);
                    }
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex gap-x-2 items-end justify-between pt-2">
          <div className="text-[10px] text-muted-foreground font-mono">
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span>&#8984;</span> Enter
            </kbd>{" "}
            to Submit
          </div>
          <Button
            disabled={isButtonDisabled}
            className={cn(
              "size-8 rounded-full",
              isButtonDisabled &&
                "bg-muted-foreground border cursor-not-allowed"
            )}
          >
            {isPending ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : (
              <ArrowUpIcon />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProjectMessageForm;
