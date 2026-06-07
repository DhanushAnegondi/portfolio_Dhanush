import * as React from "react";

export interface TerminalLine {
  /** Prefix the line with an ember "$". */
  prompt?: boolean;
  text: string;
  /** Render muted (a command being typed). */
  dim?: boolean;
}

/**
 * The brand's signature terminal card — traffic-light header + booting mono
 * lines. Use as hero "imagery" or to surface real artifacts over decoration.
 *
 * @startingPoint section="Brand" subtitle="Booting terminal stack panel" viewport="700x300"
 */
export interface TerminalPanelProps {
  /** Window title in the header. @default "~/dhanush — stack" */
  title?: string;
  lines?: TerminalLine[];
  /** Show the blinking ember cursor line. @default true */
  cursor?: boolean;
  /** Stagger the lines booting in. @default true */
  animate?: boolean;
  style?: React.CSSProperties;
}

export function TerminalPanel(props: TerminalPanelProps): JSX.Element;
