import { useEffect, useRef } from "react";

type Event = MouseEvent | TouchEvent;

export const useOnClickOutside = (handler: (event: Event) => void) => {
  const ref = useRef<any>();

  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current;
      if (!el || el.contains((event?.target as Node) || null)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);

  return { ref };
};
