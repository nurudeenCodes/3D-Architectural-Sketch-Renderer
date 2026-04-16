import { CheckCircle2, ImageIcon, UploadIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router";
import {
  PROGRESS_INTERVAL_MS,
  PROGRESS_STEP,
  REDIRECT_DELAY_MS,
} from "../../lib/constants";

interface UploadProps {
  onComplete: (base64Data: string) => void;
}

const Upload = ({ onComplete }: UploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const { isSignedIn } = useOutletContext<AuthContext>();

  const intervalIdRef = useRef<number | null>(null);
  const timeoutIdRef = useRef<number | null>(null);

  const clearTimers = () => {
    if (intervalIdRef.current !== null) {
      window.clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    if (timeoutIdRef.current !== null) {
      window.clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, []);

  const processFile = (selectedFile: File) => {
    if (!isSignedIn) {
      return;
    }

    // Clear any existing timers before starting new upload
    clearTimers();

    const reader = new FileReader();
    reader.onerror = () => {
      setError("Failed to read the file. Please try again.");
      setFile(null);
      setProgress(0);
    };

    let base64Data: string | null = null;

    reader.onload = () => {
      base64Data = reader.result as string;
      setProgress(0);

      intervalIdRef.current = window.setInterval(() => {
        setProgress((prevProgress) => {
          const nextProgress = Math.min(prevProgress + PROGRESS_STEP, 100);

          if (nextProgress === 100 && intervalIdRef.current !== null) {
            window.clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
            timeoutIdRef.current = window.setTimeout(() => {
              if (base64Data) {
                onComplete(base64Data);
              }
              timeoutIdRef.current = null;
            }, REDIRECT_DELAY_MS);
          }

          return nextProgress;
        });
      }, PROGRESS_INTERVAL_MS);
    };

    reader.readAsDataURL(selectedFile);
  };

  const handleFiles = (files: FileList | null) => {
    if (!isSignedIn || !files?.length) {
      return;
    }

    const selectedFile = files[0];

    // Validate file type
    const acceptedTypes = ["image/jpeg", "image/jpg", "image/png"];
    const acceptedExtensions = [".jpg", ".jpeg", ".png"];
    const fileExtension = selectedFile.name
      .toLowerCase()
      .substring(selectedFile.name.lastIndexOf("."));

    const isValidType =
      acceptedTypes.includes(selectedFile.type) ||
      acceptedExtensions.includes(fileExtension);

    if (!isValidType) {
      setError("Please select a valid image file (JPG, JPEG, or PNG).");
      return;
    }

    // Validate file size (50MB = 50 * 1024 * 1024 bytes)
    const maxSize = 50 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      setError("File size must be 50MB or less.");
      return;
    }

    // Clear any previous error
    setError(null);

    setFile(selectedFile);
    processFile(selectedFile);
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!isSignedIn) {
      return;
    }
    setIsDragging(true);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!isSignedIn) {
      return;
    }
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    if (!isSignedIn) {
      return;
    }

    handleFiles(event.dataTransfer.files);
  };

  return (
    <div className="upload">
      {!file ? (
        <div
          className={`dropzone ${isDragging ? "dragging" : ""}`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            className="drop-input"
            accept=".jpg, .jpeg, .png"
            disabled={!isSignedIn}
            onChange={(event) => handleFiles(event.target.files)}
          />

          <div className="drop-content">
            <div className="drop-icon">
              <UploadIcon size={20} />
            </div>
          </div>
          <p>
            {isSignedIn
              ? "Drag and drop your file here or click to browse"
              : "Please sign in to upload files"}
          </p>
          <p className="help">Maximum file size 50MB</p>
          {error && <p className="error">{error}</p>}
        </div>
      ) : (
        <div className="upload-status">
          <div className="status-content">
            <div className="status-icon">
              {progress === 100 ? (
                <CheckCircle2 size={20} className="check" />
              ) : (
                <ImageIcon size={20} className="image" />
              )}
            </div>
            <h3>{file.name}</h3>

            <div className="progress">
              <div className="bar" style={{ width: `${progress}%` }} />
              <p className="status-text">
                {progress < 100
                  ? "Analysing Floor Plan..."
                  : `Redirecting... (${progress}%)`}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
