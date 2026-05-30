import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";

/**
 * Controlled/uncontrolled state helper. If `controlled` is defined the value
 * is sourced from the parent each render and `onChange` is invoked when the
 * setter is called. Otherwise internal state is used.
 *
 * The controlled/uncontrolled mode is locked in on mount; switching modes
 * after that is unsupported and will warn in development.
 */
export function useControlled<T>(
  controlled: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void,
): [T, Dispatch<SetStateAction<T>>] {
  const isControlled = controlled !== undefined;
  const { current: wasControlled } = useRef(isControlled);

  if (process.env.NODE_ENV !== "production" && isControlled !== wasControlled) {
    // eslint-disable-next-line no-console
    console.warn(
      "[react-trip-date] A controlled prop was switched between controlled and uncontrolled. Pick one for the lifetime of the component.",
    );
  }

  const [internal, setInternal] = useState<T>(defaultValue);
  const value = isControlled ? (controlled as T) : internal;

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const setValue: Dispatch<SetStateAction<T>> = useCallback(
    next => {
      if (!wasControlled) {
        setInternal(prev => {
          const resolved =
            typeof next === "function" ? (next as (p: T) => T)(prev) : next;
          onChangeRef.current?.(resolved);
          return resolved;
        });
      } else {
        const resolved =
          typeof next === "function"
            ? (next as (p: T) => T)(controlled as T)
            : next;
        onChangeRef.current?.(resolved);
      }
    },
    [wasControlled, controlled],
  );

  return [value, setValue];
}
