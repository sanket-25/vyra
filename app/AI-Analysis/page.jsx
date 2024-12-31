"use client"

import React, { useState } from "react";

const AIAnalysis = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [height, setHeight] = useState("");
  const [sportType, setSportType] = useState("");
  const [outputData, setOutputData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile || !height || !sportType) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("height", height);
    formData.append("sport_type", sportType);

    try {
      const response = await fetch("http://13.49.67.6:5000/process-video", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process the video.");
      }

      const data = await response.json();
      setOutputData(data);
    } catch (error) {
      console.error(error);
      alert("An error occurred while processing the video.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
          AI Video Analysis
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Video
            </label>
            <input
              type="file"
              id="file"
              accept="video/*"
              onChange={handleFileChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="height"
              className="block text-sm font-medium text-gray-700"
            >
              Height (in cm)
            </label>
            <input
              type="number"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="sportType"
              className="block text-sm font-medium text-gray-700"
            >
              Sport Type
            </label>
            <input
              type="text"
              id="sportType"
              value={sportType}
              onChange={(e) => setSportType(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Submit"}
          </button>
        </form>
      </div>

      {outputData && (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Analysis Results
          </h2>
          <p className="text-gray-700 mb-4">
            <strong>Analysis Array:</strong> {JSON.stringify(outputData.analysis_array)}
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Text Output:</strong> {outputData.text_output}
          </p>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Processed Video
            </h3>
            <video
              controls
              src={`http://13.49.67.6:5000/download/${outputData.output_video_url.split("/").pop()}`}
              className="w-full rounded-lg shadow-md"
              type="video/webm"
            />
          </div>
          <a
            href={`http://13.49.67.6:5000${outputData.output_video_url}`}
            download
            className="inline-block bg-green-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Download Video
          </a>
        </div>
      )}
    </div>
  );
};

export default AIAnalysis;
