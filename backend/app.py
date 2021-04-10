from flask import Flask
from flask_login import LoginManager
from flask_mongoengine import MongoEngine
from flask_jwt_extended import JWTManager
from flask_avatars import Avatars

db = MongoEngine()
jwt = JWTManager()
avatars = Avatars()


def create_app():
    app = Flask(__name__)
    app.config['MONGODB_SETTINGS'] = {
        'db': 'blog',
        'host': 'localhost',
        'port': 27017
    }
    app.config['SECRET_KEY'] = 'secret_key'
    db.init_app(app)
    jwt.init_app(app)
    avatars.init_app(app)

    from controller.post import post
    from controller.auth import auth

    app.register_blueprint(post, url_prefix='/api/blog/post')
    app.register_blueprint(auth, url_prefix='/api/blog/auth')

    login_manager = LoginManager()
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        from model.user import User
        return User.objects(id=id)

    return app
