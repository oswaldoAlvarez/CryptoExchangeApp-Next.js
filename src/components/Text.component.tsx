import React, { PropsWithChildren } from "react";

type TextSize =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl";

type TextAlign = "left" | "center" | "right" | "justify";
type TextWeight =
  | "thin"
  | "extralight"
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold"
  | "black";

interface TextProps<T extends React.ElementType = "p">
  extends PropsWithChildren {
  tag?: T;
  size?: TextSize;
  align?: TextAlign;
  weight?: TextWeight;
  className?: string;
}

export function Text<T extends React.ElementType = "p">({
  tag,
  size = "base",
  align,
  weight,
  className,
  children,
  ...rest
}: TextProps<T>) {
  const Component = tag || "p";

  const composed = [
    `text-${size}`,
    align && `text-${align}`,
    weight && `font-${weight}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={composed} {...rest}>
      {children}
    </Component>
  );
}
