import tensorflow as tf
from predict import predict_image

def load_model(model_path: str):
    return tf.keras.models.load_model(model_path)
 

def main():
    img_file_path = "images/test-img-8.png"
    model = load_model("models/digit-guesser-softmax.keras")
    digit, confidence = predict_image(img_file_path, model)
    print(f"Predicted Digit: {digit}, Confidence: {confidence*100:.2f}%")


if __name__ == "__main__":
    main()