"use client";
import * as CheckboxRadix from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { v4 as uuidv4 } from "uuid";
import styles from "./checkbox.module.css";

interface CheckboxProps extends CheckboxRadix.CheckboxProps {
  label?: string;
  id?: string;
}

export const Checkbox = ({ label, id, ...restProps }: CheckboxProps) => {
  const checkBoxId = id || uuidv4();

  return (
    <div className={styles.Wrapper}>
      <CheckboxRadix.Root
        className={styles.CheckboxRoot}
        id={checkBoxId}
        {...restProps}
      >
        <CheckboxRadix.Indicator className={styles.CheckboxIndicator}>
          <CheckIcon />
        </CheckboxRadix.Indicator>
      </CheckboxRadix.Root>
      <label className={styles.Label} htmlFor={checkBoxId}>
        {label}
      </label>
    </div>
  );
};
