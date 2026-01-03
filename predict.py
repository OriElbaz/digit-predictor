import tensorflow as tf
import numpy as np

def load_model(model_path: str):
    return tf.keras.models.load_model(model_path)
 

def main():
    model = load_model("./models/img-four.png")
    # to predict
    new_data = ""
    prediction = model.predict(new_data)
    predicted_digit = np.argmax(prediction)
    confidence = np.max(prediction)


if __name__ == "__main__":
    main()