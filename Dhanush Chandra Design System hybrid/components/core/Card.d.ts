import * as React from "react";

/**
 * Raised content surface — ink-900 panel, 12px radius, hairline border.
 * Set `interactive` for the hover lift + ember border used by project cards.
 *
 * @startingPoint section="Core" subtitle="Card with header / title / content / footer" viewport="700x240"
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Enable hover lift + ember border warm. @default false */
  interactive?: boolean;
  children?: React.ReactNode;
}

export function Card(props: CardProps): JSX.Element;
export function CardHeader(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function CardTitle(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function CardDescription(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function CardContent(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function CardFooter(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
