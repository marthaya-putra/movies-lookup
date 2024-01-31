"use client";

import React, {
  ChangeEvent,
  ChangeEventHandler,
  Children,
  EventHandler,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./autocomplete.module.css";
import * as Portal from "@radix-ui/react-portal";

type AutocompleteType = {
  children?: ReactNode;
  loading?: boolean;
  value?: string;
  onSearchTermChanged: (term: string) => void;
};

export const Autocomplete = ({
  value,
  loading,
  children,
  onSearchTermChanged,
}: AutocompleteType) => {
  const [mounted, setMounted] = useState(false);
  const [searchValue, setSearchValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const showPortal = mounted && (loading || Children.count(children) > 0);
  const Content = loading ? <div>Loading...</div> : children;

  const domRect = inputRef.current?.getBoundingClientRect();
  const top = (domRect?.y || 0) + (domRect?.height || 0) + 5 + "px";
  const left = (domRect?.x || 0) + "px";
  const width = (domRect?.width || 0) + "px";

  const handleSearchTermChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    onSearchTermChanged?.(e.target.value);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const PortalEl = showPortal ? (
    <Portal.Root
      className={styles.PortalRoot}
      style={{ top: top, left: left, minWidth: width }}
    >
      <div className={styles.Container}> {Content} </div>
    </Portal.Root>
  ) : undefined;

  return (
    <>
      <input
        ref={inputRef}
        value={searchValue}
        className={styles.Input}
        onChange={handleSearchTermChanged}
      />
      {PortalEl}
    </>
  );
};
