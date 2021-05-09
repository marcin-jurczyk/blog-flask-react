from app import db


class BlockedJWT(db.Document):

    # id = db.StringField()
    jti = db.StringField()

    @classmethod
    def is_blocked(cls, jti):
        if cls.objects(jti=jti).first() is not None:
            return True
        else:
            return False

    @classmethod
    def block_jwt(cls, jti):
        blocked_jwt = BlockedJWT(jti=jti)
        blocked_jwt.save()
