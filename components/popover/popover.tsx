"use client";

import { ReactNode } from "react";
import * as PopoverRadix from "@radix-ui/react-popover";
import styles from "./popover.module.css";

interface PopoverType extends PopoverRadix.PopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  triggerAsChild?: boolean;
}

export const Popover = ({
  trigger,
  children,
  triggerAsChild,
  ...rest
}: PopoverType) => {
  return (
    <PopoverRadix.Root {...rest}>
      <PopoverRadix.Trigger
        asChild={triggerAsChild}
        className={styles.PopoverTrigger}
      >
        {trigger}
      </PopoverRadix.Trigger>
      <PopoverRadix.Portal>
        <PopoverRadix.Content className={styles.PopoverContent} sideOffset={5}>
          {children}
          <PopoverRadix.Arrow className={styles.PopoverArrow} />
        </PopoverRadix.Content>
      </PopoverRadix.Portal>
    </PopoverRadix.Root>
  );
};
