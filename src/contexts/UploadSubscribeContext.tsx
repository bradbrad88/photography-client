import { useState, useCallback, useEffect } from "react";
import { createCtx } from "./utils";
import { Urls } from "components/gallery/Album";

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
  urls: Urls;
}

interface ImageIdType {
  imageId: string;
}

interface PropTypes {
  children: any;
}

interface SubscribeCtx {
  subscribeImage: (imageId: string, onProgress: (data: ProgressEvent) => void) => void;
  closeConnection: () => void;
  initProgress: ProgressEvent[] | undefined;
  onComplete: (func: (data: CompleteEvent) => void) => void;
  onProgress: (func: (data: ProgressEvent) => void) => void;
}

const [useCtx, Provider] = createCtx<SubscribeCtx>();

const SubscribeProvider = ({ children }: PropTypes) => {
  const [eventSource, setEventSource] = useState<EventSource>();

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

  const onComplete = useCallback(
    (func: (data: CompleteEvent) => void) => {
      eventSource?.addEventListener("complete", (e: MessageEvent) => {
        const data = JSON.parse(e.data);
        func(data);
      });
    },
    [eventSource]
  );

  const onProgress = useCallback(
    (func: (data: ProgressEvent) => void) => {
      eventSource?.addEventListener("progress", (e: MessageEvent) => {
        const data = JSON.parse(e.data);
        func(data);
      });
    },
    [eventSource]
  );

  const openConnection = useCallback(() => {
    if (eventSource && (eventSource.readyState === 1 || eventSource.readyState === 0)) return;
    const url = new URL("/gallery/subscribe", process.env.REACT_APP_SERVER_API).toString();
    const es = new EventSource(url, { withCredentials: true });
    es.addEventListener("initialize", onInitialize);
    setEventSource(es);
  }, [eventSource, onInitialize]);

  const subscribeImage = useCallback(
    (imageId: string, onProgress: (data: ProgressEvent) => void) => {
      if (!eventSource) return;
      eventSource.addEventListener(
        "progress",
        subscribeEvent<ProgressEvent>(imageId, onProgress)
      );
    },
    [eventSource, subscribeEvent]
  );

  const closeConnection = useCallback(() => {
    if (!eventSource) return;
    eventSource.close();
    setEventSource(undefined);
  }, [eventSource]);

  useEffect(() => {
    openConnection();
  }, [openConnection]);

  useEffect(() => {
    return () => {
      closeConnection();
    };
  }, [closeConnection]);

  return (
    <Provider
      value={{ subscribeImage, closeConnection, initProgress, onComplete, onProgress }}
    >
      {children}
    </Provider>
  );
};

export default useCtx;

export { SubscribeProvider };
