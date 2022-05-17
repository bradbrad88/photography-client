import { useState, useCallback, useEffect, useRef } from "react";

export interface ProgressEvent {
  imageId: string;
  step: string;
  progress: number;
}

export interface CompleteEvent {
  imageId: string;
  uploadedBy: string;
  uploadedAt: Date;
  aspectRatio: number;
}

interface ImageIdType {
  imageId: string;
}

const useSubscribe = () => {
  const eventRef = useRef<EventSource>();
  // Initial progress gives us an array of all the steps involved in uploading an image.
  // This is done so that changes to the number and name of steps involved in the upload process won't then have to be mirrored within client side code.
  // This tackles the issue of Progress Feedback only appearing once work has begun on it.
  // This also allows streaming much smaller packets on each update.
  const [initProgress, setInitProgress] = useState<ProgressEvent[]>();

  const subscribeEvent = useCallback(
    <T extends ImageIdType>(imageId: string, func: (data: T) => void) => {
      return (e: MessageEvent) => {
        const data = JSON.parse(e.data) as T;
        if (data.imageId !== imageId) return;
        func(data);
      };
    },
    []
  );

  const onInitialize = useCallback((e: MessageEvent) => {
    const data = JSON.parse(e.data) as ProgressEvent[];
    setInitProgress(data);
  }, []);

  const openConnection = useCallback(() => {
    if (eventRef.current) return eventRef.current;
    const url = new URL("/gallery/subscribe", process.env.REACT_APP_SERVER_API).toString();
    const es = new EventSource(url, { withCredentials: true });
    es.addEventListener("initialize", onInitialize);
    return es;
  }, [onInitialize]);

  const subscribeImage = useCallback(
    (
      imageId: string,
      onProgress: (data: ProgressEvent) => void,
      onComplete: (data: CompleteEvent) => void
    ) => {
      eventRef.current = openConnection();
      eventRef.current.addEventListener(
        "progress",
        subscribeEvent<ProgressEvent>(imageId, onProgress)
      );
      eventRef.current.addEventListener(
        "complete",
        subscribeEvent<CompleteEvent>(imageId, onComplete)
      );
    },
    [openConnection, subscribeEvent]
  );

  useEffect(() => {
    eventRef.current = openConnection(); //--Use once setup
    return () => {
      closeConnection();
    };
  }, []);

  const closeConnection = () => {
    if (!eventRef.current) return;
    eventRef.current.close();
    eventRef.current = undefined;
  };

  return { subscribeImage, closeConnection, initProgress };
};

export default useSubscribe;
