from flask import Flask
from flask_mongoengine import MongoEngine
from flask_jwt_extended import JWTManager
from flask_avatars import Avatars

db = MongoEngine()
jwt = JWTManager()
avatars = Avatars()


def create_app():
    app = Flask(__name__)
    app.config.update(
        MONGODB_SETTINGS={
            'db': 'blog',
            'host': 'localhost',
            'port': 27017
        },
        SECRET_KEY='90a3c5d6adad54fde2b0f37d72d82cc739184e42f1c78cad'
    )

    db.init_app(app)
    jwt.init_app(app)
    avatars.init_app(app)

    from controller.post import post
    from controller.auth import auth

    app.register_blueprint(post, url_prefix='/api/blog/post')
    app.register_blueprint(auth, url_prefix='/api/blog/auth')

    return app
