import { Sandbox } from "@e2b/code-interpreter";
import { AgentResult, TextMessage } from "@inngest/agent-kit";

export const getSandbox = async (sandboxId: string) => {
  const sandbox = await Sandbox.connect(sandboxId);
  return sandbox;
};

export const lastAssistantMessageContent = async (result: AgentResult) => {
  const lastAssistantMessageIndex = result.output.findLastIndex(
    (message) => message.role === "assistant"
  );

  const message = result.output[lastAssistantMessageIndex] as
    | TextMessage
    | undefined;

  if (!message?.content) {
    return undefined;
  }

  if (typeof message.content === "string") {
    return message.content;
  }

  return message.content.map((item) => item.text).join("");
};
