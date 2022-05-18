import { useState, useLayoutEffect, useCallback } from "react";
import subscribeContext, { ProgressEvent } from "contexts/UploadSubscribeContext";
import { Image } from "./Album";
import "./stylesheets/ImageCards.scss";

interface PropTypes {
  image: Image;
}

interface UpdateData {
  step: string;
  progress: number;
}

const ImageUploadCard = ({ image }: PropTypes) => {
  const { subscribeImage, initProgress } = subscribeContext();
  const [progress, setProgress] = useState<UpdateData[]>([
    // { step: "hello", progress: 50 },
    // { step: "sir", progress: 100 },
  ]);

  const onProgress = useCallback((data: ProgressEvent) => {
    setProgress(prevState => {
      const prog = prevState.findIndex(prog => prog.step === data.step);
      if (prog !== -1) {
        prevState[prog] = data;
        return [...prevState];
      }
      return [...prevState, { step: data.step, progress: data.progress }];
    });
  }, []);

  const initSubscribe = useCallback(() => {
    subscribeImage(image.imageId, onProgress);
    if (initProgress && progress.length < 1) setProgress(initProgress);
  }, [image.imageId, initProgress, onProgress, subscribeImage, progress]);

  useLayoutEffect(() => {
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
      {image.urls?.thumbnail ? (
        <img src={image.urls?.thumbnail} alt={""} />
      ) : (
        <div className="coming-soon">
          <h2>IMAGE COMING SOON</h2>
        </div>
      )}
      {renderProgress()}
    </div>
  );
};

export default ImageUploadCard;
