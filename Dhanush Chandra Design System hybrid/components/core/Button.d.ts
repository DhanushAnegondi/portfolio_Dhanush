import * as React from "react";

/**
 * The primary interactive primitive for the Dhanush Chandra system.
 * Ember-filled by default, with restrained outline/secondary/ghost variants.
 *
 * @startingPoint section="Core" subtitle="Ember button with 6 variants & 4 sizes" viewport="700x180"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. @default "default" */
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  /** Control height & padding. @default "default" */
  size?: "sm" | "default" | "lg" | "icon";
  disabled?: boolean;
  children?: React.ReactNode;
}

export function Button(props: ButtonProps): JSX.Element;
