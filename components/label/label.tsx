"use client";
import * as LabelRadix from "@radix-ui/react-label";
import { ReactNode } from "react";
import styles from "./label.module.css";

export const Label = ({
  children,
  htmlFor,
}: {
  children: ReactNode;
  htmlFor?: string;
}) => (
  <LabelRadix.Root className={styles.LabelRoot} htmlFor={htmlFor}>
    {children}
  </LabelRadix.Root>
);
