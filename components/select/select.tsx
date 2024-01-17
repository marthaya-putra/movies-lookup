"use client";

import React from "react";
import * as SelectRadix from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

import styles from "./select.module.css";

interface SelectProps extends SelectRadix.SelectProps {
  items: { value: string; label: string }[];
}

export const Select = ({ items, ...rest }: SelectProps) => (
  <SelectRadix.Root {...rest}>
    <SelectRadix.Trigger
      className={styles.SelectTrigger}
      aria-label="Motion Picture Type"
    >
      <SelectRadix.Value placeholder="Select movie or series" />
      <SelectRadix.Icon className={styles.SelectIcon}>
        <ChevronDownIcon />
      </SelectRadix.Icon>
    </SelectRadix.Trigger>
    <SelectRadix.Portal>
      <SelectRadix.Content className={styles.SelectContent}>
        <SelectRadix.ScrollUpButton className={styles.SelectScrollButton}>
          <ChevronUpIcon />
        </SelectRadix.ScrollUpButton>
        <SelectRadix.Viewport className={styles.SelectViewport}>
          {items.map((item) => (
            <SelectRadix.Item
              key={item.value}
              className={styles.SelectItem}
              value={item.value}
            >
              <SelectRadix.ItemText>{item.label}</SelectRadix.ItemText>
              <SelectRadix.ItemIndicator className={styles.SelectItemIndicator}>
                <CheckIcon />
              </SelectRadix.ItemIndicator>
            </SelectRadix.Item>
          ))}
        </SelectRadix.Viewport>
        <SelectRadix.ScrollDownButton className={styles.SelectScrollButton}>
          <ChevronDownIcon />
        </SelectRadix.ScrollDownButton>
      </SelectRadix.Content>
    </SelectRadix.Portal>
  </SelectRadix.Root>
);
