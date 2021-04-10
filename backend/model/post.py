from datetime import datetime
from app import db
from model.user import User


class Post(db.Document):
    """Post collection with its comments"""
    title = db.StringField(required=True)
    body = db.StringField()
    author = db.ReferenceField(User)
    comments = db.ListField()
    createdAt = db.DateTimeField(default=datetime.utcnow)
    modified = db.BooleanField(default=False)
    lastModifiedAt = db.DateTimeField(default=datetime.utcnow)

    def update_last_modified(self):
        if not self.modified:
            self.modified = True
        self.lastModifiedAt = datetime.utcnow

    def get_author(self):
        return self.author



