import { useEffect, useState } from "react";

export function useDelayedVisibility(visible: boolean, delayMs = 200) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!visible) {
      setIsVisible(false);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsVisible(true);
    }, delayMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [visible, delayMs]);

  return isVisible;
}
