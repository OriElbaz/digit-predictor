
# MNIST Digit Drawer & Predictor

A full-stack machine learning application that allows users to draw handwritten digits from 0-9 in a web interface and receive real-time predictions with confidence scores from a trained neural network.

The model is built using TensorFlow/Keras and trained on the classic MNIST dataset. The backend API is powered by Python (FastAPI) to handle image processing and model inference.

## Features

* **Interactive Interface:** Custom HTML5 Canvas for drawing digits with mouse or touch.
* **Deep Learning Model:** Pre-trained TensorFlow Convolutional Neural Network (CNN) for high accuracy.
* **FastAPI Backend:** Lightweight and fast Python server for real-time inference.
* **Live Feedback:** Displays the predicted digit and the model's confidence percentage.

## Project Structure
```text
MNIST-DRAWING-PREDICT/
├── app.py               # The backend server API (FastAPI)
├── predict.py           # Helper scripts for model loading/prediction
├── .gitignore           # Git ignore file
│
├── frontend/            # The web user interface
│   ├── index.html       # Main HTML structure
│   ├── style.css        # Styling for the drawing canvas and UI
│   └── script.js        # Canvas drawing logic and API communication
│
├── models/              # Directory containing trained saved models
│   └── digit-guesser-softmax.keras  # The pre-trained TensorFlow model
│
├── notebooks/           # Jupyter notebooks used for development
│   └── tf-mnist-nn.ipynb # Notebook used to train and evaluate the model
│
└── images/              # Contains example test images
```

## Prerequisites

To run this project locally, you must have the following installed:

* **Python 3.10** (Crucial: The environment must use this specific version to ensure TensorFlow compatibility).
* A virtual environment tool (built-in `venv`, `virtualenv`, or Conda).

## Installation & Setup

Follow these steps to get the project running.

### 1. Clone the Repository

```bash
git clone <your-repo-url-here>
cd MNIST-DRAWING-PREDICT

```

### 2. Create and Activate a Python 3.10 Virtual Environment

It is vital to use **Python 3.10** for this project.

**Using standard `venv` (Linux/macOS):**

```bash
python3.10 -m venv venv
source venv/bin/activate

```

**Using standard `venv` (Windows):**

```bash
py -3.10 -m venv venv
venv\Scripts\activate

```

*(Note: If you are using Conda, create a 3.10 environment using: `conda create -n mnist310 python=3.10` and activate it.)*

### 3. Install Dependencies

With your virtual environment active, install the required packages:

```bash
pip install tensorflow "fastapi[standard]" uvicorn pydantic pillow numpy

```

## Usage

This application runs as two parts: the backend server and the frontend interface.

### 1. Start the Backend Server

Ensure your virtual environment is active and run the following command in the root directory:

```bash
uvicorn app:app --reload

```

You should see output indicating the server is running (usually at `http://127.0.0.1:8000`).

### 2. Open the Frontend

Navigate to the `frontend/` folder in your file explorer and double-click `index.html` to open it in your default web browser.

*Note: Alternatively, if you use VS Code, you can right-click `index.html` and select "Open with Live Server".*

### 3. Predict

1. Draw a digit (0-9) on the black canvas.
2. Click the **Predict** button.
3. The model's prediction and confidence score will appear below the canvas.
4. (For you brainrotted folks) Try and see if you can find the easter egg!
```

```
