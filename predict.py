
import numpy as np
from PIL import Image
import scipy.ndimage
 
def predict_image(image_path: str, model):
    img_array = image_to_array(image_path)
    final_array = transform_array(img_array)

    prediction = model.predict(final_array, verbose=0)
    predicted_digit = np.argmax(prediction)
    confidence = np.max(prediction)

    return predicted_digit, confidence

def image_to_array(image_path):
    original_img = Image.open(image_path).convert('L')
    resized_img = original_img.resize((20, 20))
    array = np.array(resized_img) / 255 
    return array

def transform_array(img_array):
    cy, cx = scipy.ndimage.center_of_mass(img_array)
    if np.isnan(cy): 
        cy, cx = 10.0, 10.0
    shift_y, shift_x = 10.0 - cy, 10.0 - cx
    img_centered = scipy.ndimage.shift(img_array, 
                                       shift=[shift_y, shift_x],
                                       cval=0.0)
    transposed_img = img_centered.T
    return transposed_img.reshape(1, 400)
