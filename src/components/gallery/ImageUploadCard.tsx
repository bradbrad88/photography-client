import useSubscribe, { CompleteEvent, ProgressEvent } from "hooks/useSubscribe";
import { useState, useEffect, useCallback } from "react";
import { Image } from "./Album";
import "./stylesheets/ImageCards.scss";

interface PropTypes {
  image: Image;
}

interface UpdateData {
  step: string;
  progress: number;
}

// type Steps = "loading" | "thumbnail" | "highres";

const ImageUploadCard = ({ image }: PropTypes) => {
  const { subscribeImage, initProgress } = useSubscribe();
  const [progress, setProgress] = useState<UpdateData[]>([
    // { step: "hello", progress: 50 },
    // { step: "sir", progress: 100 },
  ]);

  const onProgress = useCallback((data: ProgressEvent) => {
    setProgress(prevState => {
      const prog = prevState.findIndex(prog => prog.step === data.step);
      if (prog !== -1) {
        prevState[prog].progress = data.progress;
        return [...prevState];
      }
      return [...prevState, { step: data.step, progress: data.progress }];
    });
  }, []);

  const onComplete = useCallback((data: CompleteEvent) => {}, []);

  const initSubscribe = useCallback(() => {
    subscribeImage(image.imageId, onProgress, onComplete);
    if (initProgress && progress.length < 1) setProgress(initProgress);
  }, [image.imageId, initProgress, onProgress, onComplete, subscribeImage, progress.length]);

  useEffect(() => {
    console.log("Concerned about this USE EFFECT");
    initSubscribe();
  }, [initSubscribe]);

  const renderProgress = () => {
    if (!progress) return null;

    return (
      <div className="progress-overlay">
        {progress.map(step => (
          <div
            className={`progress-container ${step.progress === 100 ? "complete" : ""}`}
            key={step.step}
          >
            <div className="progress" style={{ width: `${100 - step.progress}%` }}></div>
            <div className={`step ${step.progress === 100 ? "complete" : ""}`}>
              {step.step}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="image-bank-card">
      <img src={image.urls.thumbnail} />
      {renderProgress()}
    </div>
  );
};

export default ImageUploadCard;
