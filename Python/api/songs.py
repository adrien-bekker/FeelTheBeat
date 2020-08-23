from flask import Blueprint, jsonify, request
from binascii import a2b_base64
from . import db
from .models import Song
import random
from tensorflow.keras.models import model_from_json
from keras.applications.xception import preprocess_input
from PIL import Image
import numpy as np
from googleapiclient.discovery import build

main = Blueprint("main", __name__)


@main.route("/setpreferences", methods=["POST"])
def set_preferences():
    pref_data = request.get_json()

    new_song = Song(pref=pref_data["pref"])

    meta = db.metadata
    for table in meta.sorted_tables:
        db.session.execute(table.delete())
    db.session.commit()

    db.session.add(new_song)
    db.session.commit()

    return "Done", 201


@main.route("/saveimage/<uri>")
def saveImage(uri):
    binary_data = a2b_base64(uri)

    with open("predict.png", "wb") as f:
        f.write(binary_data)


@main.route("/predict")
def predict():
    songs = Song.query.all()

    prefs = songs[0].pref

    prefs = prefs.split(",")

    prefs = random.choice(prefs)

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
    prediction = np.argmax(prediction)

    if prediction == 0:
        emotion = "Angry"
    elif prediction == 1:
        emotion = "Calm"
    elif prediction == 2:
        emotion = "Happy"
    else:
        emotion = "Sad"

    youtube = build("youtube", "v3",
                    developerKey="AIzaSyCXBY-aPwP4eFdaIKzdbDtZwCKq3zBdxrY")
    req = youtube.search().list(
        q=f"{prefs} {emotion} song", part="snippet", type="video")
    res = req.execute()

    songs = {}
    for i, item in enumerate(res["items"]):
        songs[f"songName{i+1}"] = item["snippet"]["title"]
        songs[f"songLink{i+1}"] = f"https://www.youtube.com/watch?v={item['id'][f'videoId']}"

    return jsonify({"songName1": songs["songName1"],
                    "songName2": songs["songName2"],
                    "songName3": songs["songName3"],
                    "songName4": songs["songName4"],
                    "songName5": songs["songName5"],
                    "songLink1": songs["songLink1"],
                    "songLink2": songs["songLink2"],
                    "songLink3": songs["songLink3"],
                    "songLink4": songs["songLink4"],
                    "songLink5": songs["songLink5"],
                    "emotion": emotion,
                    })
