# TomatoGuard: AI-Powered Tomato Disease Detection

![TomatoGuard Application Screenshot](https://github.com/ayaz2004/TomatoGuard/blob/main/application-screenshot.png)

TomatoGuard is a comprehensive web application that uses deep learning to instantly detect and diagnose diseases in tomato plants from leaf images. This tool helps farmers and gardeners identify plant health issues early, providing specific treatment recommendations and preventative measures.

## Features

- **Instant Disease Detection**: Upload a leaf image and get immediate diagnostic results
- **Comprehensive Disease Information**: Detailed descriptions, scientific names, severity ratings, and treatment recommendations
- **User-Friendly Interface**: Intuitive drag-and-drop image uploading
- **Disease Reference Guide**: Information on common tomato plant diseases and conditions

## Technology Stack

### Frontend

- **React.js**: Modern component-based UI architecture
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Framer Motion**: Animation library for enhanced UX
- **React Icons**: Icon components for visual indicators
- **Axios**: Promise-based HTTP client for API requests
- **React Dropzone**: Drag-and-drop file upload functionality

### Backend

- **FastAPI**: High-performance Python web framework
- **TensorFlow**: Machine learning framework for image classification
- **TensorFlow Serving**: Model serving system
- **Docker**: Containerization for consistent deployment
- **Uvicorn**: ASGI server for Python web applications
- **PIL/Pillow**: Image processing library

### Machine Learning

- **CNN Architecture**: Deep learning model trained on tomato leaf images
- **10-Class Classification**: Identifies multiple disease conditions and healthy leaves
- **Jupyter Notebooks**: Used for model development and training

## Detected Conditions

TomatoGuard can identify the following tomato plant conditions:

1. **Bacterial Spot** (_Xanthomonas campestris pv. vesicatoria_)
2. **Early Blight** (_Alternaria solani_)
3. **Late Blight** (_Phytophthora infestans_)
4. **Leaf Mold** (_Passalora fulva_)
5. **Septoria Leaf Spot** (_Septoria lycopersici_)
6. **Spider Mites** (_Tetranychus urticae_)
7. **Target Spot** (_Corynespora cassiicola_)
8. **Yellow Leaf Curl Virus** (TYLCV)
9. **Mosaic Virus** (ToMV/TMV)
10. **Healthy** plants

## Project Structure

```
TomatoGuard/
├── api/                      # FastAPI backend
│   └── main.py               # API endpoints and ML model integration
├── web-app/                  # React frontend
│   ├── src/
│   │   ├── App.jsx           # Main application component
│   │   └── ...
├── new_models/               # TensorFlow model files
├── Train_Tomato.ipynb        # Model training notebook
├── models.config             # TensorFlow Serving configuration
├── docker-compose.yml        # Docker setup for services
└── README.md                 # Project documentation
```

## Setup Instructions

### Prerequisites

- Docker and Docker Compose
- Node.js (v14+)
- Python 3.8+

### Docker Setup for TensorFlow Serving

1. Create a `docker-compose.yml` file:

```yaml
version: "4"

services:
  tf-serving:
    image: tensorflow/serving
    ports:
      - "8501:8501"
    volumes:
      - ./new_models:/models/tomatoes_model
      - ./models.config:/models/models.config
    command: --model_config_file=/models/models.config --rest_api_port=8501
    restart: always
```

2. Start the TensorFlow Serving container:

```bash
docker-compose up -d
```

### Backend Setup

1. Navigate to the API directory:

```bash
cd api
```

2. Install Python dependencies:

```bash
pip install fastapi uvicorn numpy pillow tensorflow requests
```

3. Run the FastAPI server:

```bash
python main.py
```

The API will be available at http://localhost:8000

### Frontend Setup

1. Navigate to the web app directory:

```bash
cd web-app
```

2. Install Node.js dependencies:

```bash
npm install
```

3. Start the React development server:

```bash
npm start
```

4. Access the application at http://localhost:3000 (or your configured port)

## Usage

1. Open the TomatoGuard application in your browser
2. Upload a tomato leaf image using the drag-and-drop interface or file selection dialog
3. Click "Analyze Leaf" to process the image
4. View the detailed analysis results, including:
   - Detected condition
   - Confidence level
   - Scientific information
   - Treatment recommendations
   - Prevention strategies

## Model Training

The disease detection model was trained using transfer learning with a convolutional neural network architecture. The process is documented in `Train_Tomato.ipynb`.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [PlantVillage Dataset](https://www.kaggle.com/datasets/emmarex/plantdisease) for training data
- TensorFlow team for ML framework and serving capabilities
- codebasics tutotials.
