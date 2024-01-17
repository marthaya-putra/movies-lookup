"use client";

import React from "react";
import * as RadioGroupRadix from "@radix-ui/react-radio-group";
import styles from "./radio-group.module.css";

interface RadioGroupProps extends RadioGroupRadix.RadioGroupProps {
  items: Array<{ value: string; label: string }>;
}

export const RadioGroup = ({ items, ...restProps }: RadioGroupProps) => (
  <RadioGroupRadix.Root className={styles.RadioGroupRoot} {...restProps}>
    {items.map((item) => (
      <div style={{ display: "flex", alignItems: "center" }} key={item.value}>
        <RadioGroupRadix.Item
          className={styles.RadioGroupItem}
          value={item.value}
          id={`rdg-${item.value}${item.label}`}
        >
          <RadioGroupRadix.Indicator className={styles.RadioGroupIndicator} />
        </RadioGroupRadix.Item>
        <label
          className={styles.Label}
          htmlFor={`rdg-${item.value}${item.label}`}
        >
          {item.label}
        </label>
      </div>
    ))}
  </RadioGroupRadix.Root>
);
