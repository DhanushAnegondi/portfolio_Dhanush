import * as React from "react";

/**
 * Single-line text input — transparent fill, hairline border, ember focus ring.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

export function Input(props: InputProps): JSX.Element;
