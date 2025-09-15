import React, { useRef, useState } from "react";

const MoodFinder: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);

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

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      // Set canvas size to match video size
      canvasRef.current.width = 320;
      canvasRef.current.height = 240;
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, 320, 240);
        const imageData = canvasRef.current.toDataURL("image/png");
        setPhoto(imageData);
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
    alert(e);
    alert("Mood logged! (Functionality to be implemented)");
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
            <div>
              <h3>Captured Photo:</h3>
              <img src={photo} alt="Captured" className="captured-photo" />
            </div>

            <button type="submit" className="submit-btn">
              Log My Mood 📝
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default MoodFinder;
