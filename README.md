# TomatoGuard: AI-Powered Tomato Disease Detection

An application that uses machine learning to detect diseases in tomato plants from leaf images.

## Project Structure

- `/api`: FastAPI backend for model serving
- `/web-app`: React frontend application
- `/new_models`: TensorFlow model files (stored with Git LFS)

## Setup Instructions

### Backend Setup

1. Install Python dependencies:
   ```
   pip install fastapi uvicorn numpy pillow tensorflow requests
   ```
2. Start TensorFlow Serving:
   ```
   tensorflow_model_server --model_config_file=models.config --rest_api_port=8501
   ```
3. Run the FastAPI server:
   ```
   cd api
   python main.py
   ```

### Frontend Setup

1. Install Node.js dependencies:
   ```
   cd web-app
   npm install
   ```
2. Start the React development server:
   ```
   npm start
   ```

## Access the Application

Open http://localhost:3000 in your browser
