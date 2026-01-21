import { useEffect, useState } from "react";

export function useProgressiveImage(primary, fallback, timeoutMs = 1000) {
  const [src, setSrc] = useState(fallback || primary || "");

  useEffect(() => {
    setSrc(fallback || primary || "");

    if (!primary) return;

    let cancelled = false;
    const img = new Image();

    const timer = setTimeout(() => {
      cancelled = true;
    }, timeoutMs);

    img.onload = () => {
      clearTimeout(timer);
      if (!cancelled) setSrc(primary);
    };

    img.onerror = () => {
      clearTimeout(timer);
    };

    img.src = primary;

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [primary, fallback, timeoutMs]);

  return src;
}
