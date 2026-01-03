import tensorflow as tf
from predict import predict_image
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import Image
import os, io, time, base64

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


print("Loading model...")
model = tf.keras.models.load_model("models/digit-guesser-softmax.keras")
print("Model loaded.")


class ImagePayload(BaseModel):
    image_data: str

@app.post("/predict")
async def predict_digit(payload: ImagePayload):
    try:
        header, encoded = payload.image_data.split(",", 1)
        data = base64.b64decode(encoded)

        image_stream = io.BytesIO(data)
        img = Image.open(image_stream)
        predicted_digit, confidence = predict_image(img, model)

        return {
            "status": "success",
            "digit": int(predicted_digit),
            "confidence": f"{confidence*100:.2f}"
        }
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))



