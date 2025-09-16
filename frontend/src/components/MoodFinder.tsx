import React, { useRef, useState, useEffect } from "react";
import * as faceapi from "face-api.js";
import { getMoodOptionByName, mapExpressionToMood, MoodOption } from "../types";
interface MoodFinderProps {
  onMoodSelect: (mood: MoodOption, energyLevel: number, notes: string) => void;
}
const MoodFinder: React.FC<MoodFinderProps> = ({ onMoodSelect }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [detectedMood, setDetectedMood] = useState<MoodOption | null>(null);
  // Load face-api.js models on mount
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        ]);
        setModelsLoaded(true);
      } catch (err) {
        console.error("Error loading models:", err);
      }
    };
    loadModels();
  }, []);

  const startCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraOn(true);
        }
      } catch (err) {
        alert("Unable to access camera.");
      }
    }
  };

  const capturePhoto = async () => {
    if (videoRef.current && canvasRef.current) {
      canvasRef.current.width = 320;
      canvasRef.current.height = 240;
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, 320, 240);
        const imageData = canvasRef.current.toDataURL("image/png");
        setPhoto(imageData);
        console.log("modelsLoaded:", modelsLoaded);
        if (modelsLoaded) {
          console.log("Running detection");
          // Run face-api.js detection
          const detections = await faceapi
            .detectSingleFace(
              canvasRef.current,
              new faceapi.TinyFaceDetectorOptions()
            )
            .withFaceExpressions();
          if (detections && detections.expressions) {
            // Find the expression with the highest probability
            const sorted = Object.entries(detections.expressions).sort(
              (a, b) => b[1] - a[1]
            );
            const mappedMoodName = mapExpressionToMood(sorted[0][0]);
            const mappedMood = getMoodOptionByName(mappedMoodName);
            console.log(
              "Detected expression:",
              sorted[0][0],
              "Mapped mood:",
              mappedMood
            );
            // Map to app mood
            setDetectedMood(mappedMood);
          } else {
            setDetectedMood(null);
          }
        }
      }
    }
  };

  const turnOffCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setCameraOn(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting detected mood:", detectedMood);
    if (detectedMood) {
      onMoodSelect(detectedMood, 3, "Detected Facial Expressions");
    }
  };

  return (
    <div className="mood-selector">
      <h2>Find Your Mood with a Selfie! 📸</h2>
      <form onSubmit={handleSubmit}>
        <div className="video-container">
          <video ref={videoRef} className="video-bg" autoPlay playsInline />

          <div className="camera-btn-row">
            {!cameraOn && (
              <button
                type="button"
                className={`tab-button general`}
                onClick={startCamera}
              >
                Turn Camera On
              </button>
            )}
            {cameraOn && (
              <div>
                <button
                  type="button"
                  className={`tab-button general`}
                  onClick={capturePhoto}
                >
                  Capture Photo
                </button>
                <button
                  type="button"
                  className={`tab-button general`}
                  onClick={turnOffCamera}
                >
                  Turn Camera Off
                </button>
              </div>
            )}
          </div>
        </div>

        <canvas ref={canvasRef} className="hidden-canvas" />

        {photo && (
          <div className="mood-details">
            <div className="side-flex">
              <div>
                <h3>Captured Photo:</h3>
                <img src={photo} alt="Captured" className="captured-photo" />
              </div>
              <div>
                {detectedMood ? (
                  <span>
                    You look{" "}
                    <b>
                      {detectedMood.name} {detectedMood.emoji}
                    </b>
                  </span>
                ) : (
                  <span>No face detected or detecting mood...</span>
                )}
              </div>
            </div>
            <button type="submit" className="submit-btn">
              Set My Mood 📝
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default MoodFinder;
