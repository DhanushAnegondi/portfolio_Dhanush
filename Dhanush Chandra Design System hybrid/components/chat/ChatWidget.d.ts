import * as React from "react";

/**
 * The portfolio's "Ask my AI" widget — floating ember launcher + popover with
 * suggestions, message thread, typing state, and composer. Fake-interactive by
 * default (canned replies); pass `getReply` to wire a real endpoint.
 *
 * @startingPoint section="Brand" subtitle="Floating AI assistant launcher + chat" viewport="700x520"
 */
export interface ChatWidgetProps {
  /** Controlled open state. Omit for uncontrolled. */
  open?: boolean;
  /** Initial open state when uncontrolled. @default false */
  defaultOpen?: boolean;
  /** Called with the next open state whenever the launcher is toggled. */
  onOpenChange?: (open: boolean) => void;
  /** Map a user message to a reply string. @default canned profile answers */
  getReply?: (text: string) => string;
  style?: React.CSSProperties;
}

export function ChatWidget(props: ChatWidgetProps): JSX.Element;
