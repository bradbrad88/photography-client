import { useCallback, useEffect, useRef } from "react";

interface ProgressEvent {
  imageId: string;
  userId: string;
  step: string;
  progress: number;
}

const useSubscribe = () => {
  const eventRef = useRef<EventSource>();

  const statusEvent = useCallback((imageId: string, func: (data: any) => void) => {
    return (e: MessageEvent) => {
      const data = JSON.parse(e.data) as ProgressEvent;
      if (data.imageId !== imageId) return;
      func(data);
    };
  }, []);

  const openConnection = useCallback(() => {
    if (eventRef.current) return eventRef.current;
    const url = new URL("/gallery/subscribe", process.env.REACT_APP_SERVER_API).toString();
    const es = new EventSource(url, { withCredentials: true });
    return es;
  }, []);

  useEffect(() => {
    // eventRef.current = openConnection(); --Use once setup
    return () => {
      closeConnection();
    };
  }, []);

  const closeConnection = () => {
    if (!eventRef.current) return;
    eventRef.current.close();
    eventRef.current = undefined;
  };

  const subscribeImage = (imageId: string, func: (data: any) => void) => {
    eventRef.current = openConnection();
    eventRef.current.addEventListener("progress", statusEvent(imageId, func));
  };

  return { subscribeImage, closeConnection };
};

export default useSubscribe;
