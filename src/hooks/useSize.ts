import { useCallback, useEffect, useState, useRef } from "react";

interface Size {
  x: number;
  y: number;
  width: number;
  height: number;
}

declare global {
  interface Window {
    observerref: any;
  }
}

const useSize = (): [Size, (node: HTMLDivElement) => void] => {
  const [size, setSize] = useState<Size>({ x: 0, y: 0, width: 0, height: 0 });
  const observerRef = useRef<ResizeObserver>();
  const ref = useCallback((node: HTMLElement): void => {
    if (!node) return;
    observerRef.current = new ResizeObserver(entries => {
      if (!entries[0]) return;
      setSize(entries[0].contentRect);
    });
    observerRef.current.observe(node);
    window.observerref = observerRef.current;
  }, []);

  useEffect(() => {
    return () => observerRef.current?.disconnect();
  }, [observerRef]);

  return [size, ref];
};

export default useSize;
