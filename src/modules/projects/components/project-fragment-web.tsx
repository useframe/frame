import { useState } from "react";
import { Fragment } from "@/generated/prisma/client";
import { ExternalLinkIcon, RefreshCcwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProjectFragmentWebProps {
  data: Fragment;
}

const ProjectFragmentWeb = ({ data }: ProjectFragmentWebProps) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [fragmentKey, setFragmentKey] = useState<number>(0);

  const handleRefresh = () => {
    setFragmentKey((prev) => prev + 1);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(data?.sandboxUrl);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const handleExternalLink = () => {
    if (!data?.sandboxUrl) return;
    window.open(data?.sandboxUrl, "_blank");
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center gap-x-2 bg-muted border-b p-2₹">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="sm" variant="outline" onClick={handleRefresh}>
              <RefreshCcwIcon className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Refresh</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopy}
              disabled={!data?.sandboxUrl || isCopied}
              className="flex-1 justify-start text-start font-normal"
            >
              <RefreshCcwIcon className="w-4 h-4" />
              <span className="truncate">{data?.sandboxUrl}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Click to copy</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              disabled={!data?.sandboxUrl}
              onClick={handleExternalLink}
            >
              <ExternalLinkIcon className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Open in a new tab</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <iframe
        key={fragmentKey}
        src={data.sandboxUrl}
        loading="lazy"
        className="w-full h-full"
        aria-label="Fragment Preview"
        sandbox="allow-forms allow-scripts allow-same-origin"
        title={`Fragment Preview: ${data.title} || ${data.id}`}
      />
    </div>
  );
};

export default ProjectFragmentWeb;
