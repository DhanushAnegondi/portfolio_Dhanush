import * as React from "react";

/**
 * Compact label. Four real variants from the portfolio: skill cloud pills,
 * neutral tech-stack tags, the tiny "AI" badge, and dotted status pills.
 *
 * @startingPoint section="Core" subtitle="Skill / tag / status / AI chips" viewport="700x180"
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default "tag" */
  variant?: "skill" | "tag" | "status" | "ai";
  /** Status dot/text color — only used when variant="status". @default "ember" */
  tone?: "ember" | "success" | "danger";
  children?: React.ReactNode;
}

export function Badge(props: BadgeProps): JSX.Element;
