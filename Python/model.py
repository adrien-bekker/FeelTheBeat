from keras.models import model_from_json
from keras.applications.xception import preprocess_input
import matplotlib.pyplot as plt
from PIL import Image
import numpy as np

with open("D:\ReactStuff\FeelTheBeat\Python\model_architecture.json", "r") as f:
    model = model_from_json(f.read())

model.load_weights("D:\ReactStuff\FeelTheBeat\Python\model_weights.h5")

image = Image.open(
    "D:\ReactStuff\FeelTheBeat\Python\predict.png")
new_image = Image.new("RGB", (299, 299), (255, 255, 255))
new_image.paste(image, mask=image.split()[3])
#image = np.array(image.resize((299, 299)))
img = np.array(new_image).reshape(1, 299, 299, 3)
img = preprocess_input(img)
prediction = model.predict(img)
print(prediction)

print(np.argmax(prediction))
