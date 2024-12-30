'use client'
import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import a chart library like Chart.js or Recharts
export default function AICoach() {
  const [videoFile, setVideoFile] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!videoFile) {
      alert("Please upload a video file.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("video", videoFile);

    try {
      const response = await fetch("/api/analyze-video", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        alert("Error analyzing video. Please try again.");
        return;
      }

      const data = await response.json();
      setAnalysisData(data);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while uploading the video.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-4 grid-rows-10 gap-0">
      {Array.from({ length: 40 }).map((_, index) => (
        <div
          key={index}
          className={`border-r border-b border-[#9e9e9e] ${index % 4 === 3 ? 'border-r-0' : ''} ${index >= 36 ? 'border-b-0' : ''} aspect-square`}
        />
      ))}

      <div className=" absolute p-6 max-w-4xl mx-auto text-center ml-48 mt-4 mb-4">
        {/* Section for AI Coach heading */}
        <h1 className="text-4xl mt-24 text-black dark:text-white font-bold mb-4 animate__animated animate__fadeInUp">
          AI Coach
        </h1>

        {/* Information about AI Coach */}
        <div className="mb-8">
          <p className="text-lg dark:text-white text-black mb-4">
            AI Coach is a cutting-edge tool designed to analyze your performance in various physical activities, with a focus on running. Using advanced machine learning algorithms, AI Coach can process videos of your runs, providing valuable insights into your form, technique, and performance.
          </p>
          <p className="text-lg text-black dark:text-white mb-4">
            The AI analyzes the video in real-time, breaking down key parameters such as running speed, stride length, cadence, body posture, and more. With this data, the AI provides personalized feedback on how you can improve your performance, avoid injuries, and maximize your training effectiveness.
          </p>
          <p className="text-lg text-black dark:text-white mb-4">
            Whether you're a professional athlete or a fitness enthusiast, AI Coach can take your training to the next level.
          </p>
        </div>

        {/* Video Section */}
        <div className="flex justify-center mb-8">
          <video
            className="w-full md:w-4/5 lg:w-3/4 h-auto border rounded-lg"
            autoPlay
            loop
            muted
            playsInline
            src="/assets/AI.mp4"
          />
        </div>

        {/* Centered "Try AI Coach" Text */}
        <h2 className="text-2xl font-bold dark:text-white text-black mb-8">
          Unlock Your Potential with AI Coach: Analyze and Enhance Your Performance!
        </h2>

        {/* Upload Section */}
        <div className="mb-6">
          <label className="block mb-2 justify-center text-lg text-black dark:text-white font-medium">Upload Running Video:</label>
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="border p-2 w-full max-w-[400px] mx-auto dark:text-white text-black ml-40"
          />
        </div>
        <button
          onClick={handleUpload}
          className="bg-red-600 text-black dark:text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Upload and Analyze"}
        </button>

        {/* Display performance analysis if available */}
        {analysisData && (
          <div className="mt-8">
            <h2 className="text-xl text-black font-bold dark:text-white mb-4">Performance Analysis</h2>
            <div className="grid grid-cols-2 gap-4">
              {analysisData.parameters.map((param, index) => (
                <div key={index} className="p-4 border rounded">
                  <h3 className="text-lg font-medium mb-2">{param.name}</h3>
                  <DynamicLineChart data={param.data} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Mock LineChart component for graph rendering
// Replace with a real chart library implementation
const LineChartMock = ({ data }) => (
  <div className="h-40 bg-gray-200 flex items-center justify-center">
    <p>Graph Placeholder</p>
  </div>
);
