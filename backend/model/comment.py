from datetime import datetime
from app import db


class Comment(db.Document):
    """Comment object embedded in Post collection"""
    body = db.StringFiled(required=True)
    createAt = db.DateTimeField(default=datetime.utcnow)
    modified = db.BooleanField(default=False)
    lastModifiedAt = db.DateTimeField(default=datetime.utcnow)

    def edit(self, new_body):
        if not self.modified:
            self.modified = True
        self.lastModifiedAt = datetime.utcnow
        self.body = new_body
