"use client";
import { useState } from "react";
import axios from "axios";

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    try {
      setLoading(true);
      const response = await axios.post(
        "https://getprediction-35867549330.africa-south1.run.app/predict",
        // "http://127.0.0.1:5000/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResult(response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 border border-gray-300 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Image Uploader</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button
        onClick={handleUpload}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload Image"}
      </button>
      {result && (
        <div className="mt-4 text-left">
          <h2 className="text-xl font-semibold">Result:</h2>
          <p>
            <strong>Class:</strong> {result.prediction_class}
          </p>
          {/* <p>
            <strong>Index:</strong> {result.prediction_index}
          </p> */}
          <p>
            <strong>Confidence:</strong> {result.confidence}
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
