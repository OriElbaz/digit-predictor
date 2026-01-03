import tensorflow as tf
from predict import predict_image
from fastapi import FastAPI


app = FastAPI()


def load_model(model_path: str):
    return tf.keras.models.load_model(model_path)

 
@app.get("/")
def predict():
    img_file_path = "images/img-seven.png"
    model = load_model("models/digit-guesser-softmax.keras")
    digit, confidence = predict_image(img_file_path, model)
    return(f"Predicted Digit: {digit}, Confidence: {confidence*100:.2f}%")

