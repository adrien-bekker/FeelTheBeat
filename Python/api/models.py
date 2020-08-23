from . import db


class Song(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    pref = db.Column(db.String(100))
