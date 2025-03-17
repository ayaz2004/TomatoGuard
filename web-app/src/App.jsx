import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import {
  FaUpload,
  FaSpinner,
  FaLeaf,
  FaInfoCircle,
  FaCheckCircle,
  FaExclamationTriangle,
  FaThermometerHalf,
  FaPrescriptionBottleAlt,
  FaSeedling,
  FaBug,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
    setError(null);
    setPrediction(null);

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    maxFiles: 1,
  });

  const handleSubmit = async () => {
    if (!file) {
      setError("Please select an image first");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8000/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPrediction(response.data);
    } catch (err) {
      setError(
        err.response?.data?.error || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const getDiseaseInfo = (diseaseName) => {
    const diseaseInfoMap = {
      "Target Spot": {
        scientificName: "Corynespora cassiicola",
        description:
          "A fungal disease causing circular brown spots with yellow halos that appear like targets.",
        severity: "Moderate",
        treatment:
          "Apply copper-based fungicides every 7-10 days. Remove and destroy infected leaves. Ensure proper air circulation between plants.",
        prevention:
          "Use disease-free seeds, practice crop rotation, and maintain adequate spacing between plants.",
      },
      "Mosaic Virus": {
        scientificName:
          "Tomato Mosaic Virus (ToMV) / Tobacco Mosaic Virus (TMV)",
        description:
          "A viral disease causing mottled light and dark green patterns on leaves with possible leaf distortion.",
        severity: "High",
        treatment:
          "No chemical treatment is effective. Remove and destroy infected plants to prevent spread.",
        prevention:
          "Use resistant varieties, sanitize tools, control aphids which spread the virus, and avoid smoking near plants.",
      },
      "Yellow Leaf Curl Virus": {
        scientificName: "Tomato Yellow Leaf Curl Virus (TYLCV)",
        description:
          "A viral disease causing upward curling of leaves, yellowing, and stunted growth.",
        severity: "High",
        treatment:
          "No cure available once infected. Remove infected plants to prevent spread.",
        prevention:
          "Control whitefly populations, use reflective mulches, grow resistant varieties, and use insect screens.",
      },
      "Bacterial Spot": {
        scientificName: "Xanthomonas campestris pv. vesicatoria",
        description:
          "Bacterial disease causing small, dark brown spots on leaves, stems, and fruits with yellow halos.",
        severity: "Moderate to High",
        treatment:
          "Apply copper-based bactericides. Prune infected parts and ensure good air circulation.",
        prevention:
          "Use disease-free seeds, avoid overhead irrigation, practice crop rotation, and disinfect garden tools.",
      },
      "Early Blight": {
        scientificName: "Alternaria solani",
        description:
          "Fungal disease causing dark brown spots with concentric rings on lower leaves first, then spreading upward.",
        severity: "Moderate",
        treatment:
          "Apply fungicides containing chlorothalonil or copper. Remove infected leaves promptly.",
        prevention:
          "Mulch around plants, avoid wetting foliage, provide adequate spacing, and practice crop rotation.",
      },
      Healthy: {
        scientificName: "N/A",
        description: "Plant shows no signs of disease or pest damage.",
        severity: "None",
        treatment: "No treatment needed. Continue good agricultural practices.",
        prevention:
          "Maintain regular watering, proper fertilization, and monitoring for early signs of problems.",
      },
      "Late Blight": {
        scientificName: "Phytophthora infestans",
        description:
          "Serious fungal disease causing dark, water-soaked lesions on leaves that quickly turn brown and brittle.",
        severity: "High",
        treatment:
          "Apply protective fungicides containing chlorothalonil, mancozeb, or copper. Remove infected plants in severe cases.",
        prevention:
          "Plant resistant varieties, provide good air circulation, avoid overhead irrigation, and destroy plant debris after harvest.",
      },
      "Leaf Mold": {
        scientificName: "Passalora fulva (formerly Cladosporium fulvum)",
        description:
          "Fungal disease causing yellow patches on upper leaf surfaces and olive-green to grayish-brown mold on undersides.",
        severity: "Moderate",
        treatment:
          "Apply fungicides containing chlorothalonil or copper. Improve greenhouse ventilation if applicable.",
        prevention:
          "Reduce humidity, increase spacing between plants, avoid leaf wetness, and remove lower infected leaves.",
      },
      "Septoria Leaf Spot": {
        scientificName: "Septoria lycopersici",
        description:
          "Fungal disease causing small circular spots with dark borders and light gray centers, primarily on lower leaves.",
        severity: "Moderate",
        treatment:
          "Apply fungicides containing chlorothalonil or copper. Remove heavily infected leaves.",
        prevention:
          "Mulch around plants, practice crop rotation, avoid overhead watering, and remove plant debris after harvest.",
      },
      "Two-Spotted Spider Mite": {
        scientificName: "Tetranychus urticae",
        description:
          "Tiny arachnids that cause stippling (tiny yellow/white spots) on leaves, fine webbing, and leaf yellowing.",
        severity: "Moderate to High",
        treatment:
          "Apply insecticidal soap or neem oil. In severe cases, use commercial miticides. Rinse plants with water spray.",
        prevention:
          "Increase humidity around plants, introduce predatory mites, and regularly inspect plants for early detection.",
      },
    };

    return (
      diseaseInfoMap[diseaseName] || {
        scientificName: "Unknown",
        description: "No specific information available for this condition.",
        severity: "Unknown",
        treatment:
          "Consult with a plant pathologist or agricultural extension service.",
        prevention:
          "Maintain good agricultural practices and monitor plants regularly.",
      }
    );
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "High":
        return "text-red-600";
      case "Moderate to High":
        return "text-orange-600";
      case "Moderate":
        return "text-amber-500";
      case "Low":
        return "text-yellow-500";
      case "None":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <header className="bg-green-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaLeaf className="text-2xl text-green-300" />
              <h1 className="text-2xl md:text-3xl font-bold">TomatoGuard</h1>
            </div>
            <p className="hidden md:block font-light italic">
              Protecting your tomato crops with AI
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 text-center">
            Upload a tomato leaf image for disease detection
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300 hover:border-green-400"
                }`}
              >
                <input {...getInputProps()} />
                <FaUpload className="mx-auto text-3xl text-gray-400 mb-3" />
                {isDragActive ? (
                  <p className="text-green-600">Drop the image here...</p>
                ) : (
                  <p className="text-gray-500">
                    Drag &amp; drop a tomato leaf image here, or click to select
                  </p>
                )}
              </div>

              {preview && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Preview:</p>
                  <div className="relative aspect-square max-h-64 overflow-hidden rounded-lg">
                    <img
                      src={preview}
                      alt="Leaf preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading || !file}
                className={`w-full mt-4 py-3 rounded-lg flex items-center justify-center ${
                  loading || !file
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" /> Processing...
                  </>
                ) : (
                  <>Analyze Leaf</>
                )}
              </button>

              {error && (
                <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                  {error}
                </div>
              )}
            </div>

            {/* Results Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold border-b pb-2 mb-4">
                Analysis Results
              </h3>

              {!prediction && !loading && (
                <div className="flex flex-col items-center justify-center h-64 text-center text-gray-500">
                  <FaInfoCircle className="text-4xl mb-2 text-gray-400" />
                  <p>
                    Upload and analyze an image to see disease detection results
                  </p>
                </div>
              )}

              {loading && (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <FaSpinner className="text-4xl text-green-500 animate-spin mb-4" />
                  <p className="text-gray-600">Analyzing your tomato leaf...</p>
                </div>
              )}

              {prediction && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-green-600">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-700">
                        Condition Detected:
                      </h4>
                      <span
                        className={`font-bold text-lg ${
                          prediction.class === "Healthy"
                            ? "text-green-600"
                            : "text-amber-600"
                        }`}
                      >
                        {prediction.class}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 italic mb-2">
                      {getDiseaseInfo(prediction.class).scientificName}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-1 flex items-center">
                      <FaCheckCircle className="mr-2 text-green-600" />{" "}
                      Confidence:
                    </h4>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className={`h-4 rounded-full ${
                          prediction.confidence > 0.7
                            ? "bg-green-500"
                            : prediction.confidence > 0.4
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${prediction.confidence * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-right text-sm mt-1">
                      {(prediction.confidence * 100).toFixed(1)}%
                    </p>
                  </div>

                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                      <FaInfoCircle className="mr-2 text-blue-500" />{" "}
                      Description:
                    </h4>
                    <p className="text-gray-600">
                      {getDiseaseInfo(prediction.class).description}
                    </p>
                  </div>

                  <div className="mt-2 flex items-center">
                    <h4 className="font-medium text-gray-700 flex items-center mr-2">
                      <FaExclamationTriangle className="mr-2 text-amber-500" />{" "}
                      Severity:
                    </h4>
                    <span
                      className={`font-medium ${getSeverityColor(
                        getDiseaseInfo(prediction.class).severity
                      )}`}
                    >
                      {getDiseaseInfo(prediction.class).severity}
                    </span>
                  </div>

                  <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h4 className="font-medium text-blue-700 mb-2 flex items-center">
                      <FaPrescriptionBottleAlt className="mr-2" /> Treatment:
                    </h4>
                    <p className="text-blue-800">
                      {getDiseaseInfo(prediction.class).treatment}
                    </p>
                  </div>

                  <div className="mt-4 bg-green-50 p-4 rounded-lg border border-green-100">
                    <h4 className="font-medium text-green-700 mb-2 flex items-center">
                      <FaSeedling className="mr-2" /> Prevention:
                    </h4>
                    <p className="text-green-800">
                      {getDiseaseInfo(prediction.class).prevention}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Disease Information Section */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <FaLeaf className="mr-2 text-green-600" />
              Common Tomato Diseases & Conditions
            </h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Early Blight",
                  "Late Blight",
                  "Leaf Mold",
                  "Bacterial Spot",
                  "Mosaic Virus",
                  "Two-Spotted Spider Mite",
                  "Septoria Leaf Spot",
                  "Target Spot",
                ].map((disease) => (
                  <div
                    key={disease}
                    className="border-l-4 border-green-500 pl-3 py-2 bg-gray-50 rounded-r-md hover:bg-gray-100 transition-colors"
                  >
                    <h3 className="font-medium text-gray-800 flex items-center">
                      {disease === "Two-Spotted Spider Mite" ? (
                        <FaBug className="mr-1 text-amber-600" />
                      ) : (
                        <FaLeaf className="mr-1 text-green-600" />
                      )}
                      {disease}
                    </h3>
                    <p className="text-xs text-gray-500 italic">
                      {getDiseaseInfo(disease).scientificName}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {getDiseaseInfo(disease).description}
                    </p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs font-medium mr-1">
                        Severity:
                      </span>
                      <span
                        className={`text-xs ${getSeverityColor(
                          getDiseaseInfo(disease).severity
                        )}`}
                      >
                        {getDiseaseInfo(disease).severity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="mt-12 bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 TomatoGuard | AI-Powered Tomato Disease Detection</p>
          <p className="text-sm text-gray-400 mt-1">
            Helping farmers protect their crops using machine learning
            technology
          </p>
        </div>
      </footer>
    </div>
  );
}
