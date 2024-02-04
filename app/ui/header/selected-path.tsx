"use client";
import { usePathname } from "next/navigation";
import styles from "./selected-path.module.css";

export const SelectedPath = ({ path }: { path: string }) => {
  const pathName = usePathname();
  const isCurrentPath = path === pathName;
  return <div className={isCurrentPath ? styles.Selected : ""}></div>;
};
