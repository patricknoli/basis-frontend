import { ReactNode } from "react"

export type ButtonProps = {
  children: ReactNode;
  icon?: ReactNode;
  width: "full" | "auto";
}