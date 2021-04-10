from flask import Response, jsonify
from flask_jwt_extended import create_access_token, get_jwt_identity
from werkzeug.security import check_password_hash, generate_password_hash

from model.post import Post
from model.user import User


def get_user_id(email):
    user = User.objects(email=email).first()
    if user is not None:
        return user.id
    else:
        return Response(
            "No user found with email: " + email,
            status=404
        )


def login_controller(email, password):
    user = User.objects(email=email).first()
    if user is not None:
        if check_password_hash(user.password, password):
            return {
                'Bearer token': create_access_token(identity=email)
            }
        else:
            return Response("Password is incorrect", status=401)

    return Response("No user found with email: " + email, status=404)


def sign_up_controller(email, username, password):
    if User.objects(email=email).first() is None:
        hash_pass = generate_password_hash(password, method='sha256')
        new_user = User(email=email, username=username, password=hash_pass)
        new_user.save()
        return jsonify(new_user.get_user_info())
    else:
        return Response("User already exist...", status=409)


def get_user_info(value, option):
    if option == 'USERNAME':
        user = User.objects(username=value).first()
    elif option == 'EMAIL':
        user = User.objects(email=value).first()
    else:
        user = None

    if user is not None:
        return user.get_user_info()
    else:
        return Response("User not found...", status=404)


def add_new_post(title, body):
    # existed_post = Post.objects(title=title).first()
    # # existed_post.get_post_info()
    # if existed_post is not None:
    #     return existed_post.get_author()

    if Post.objects(title=title).first() is None:
        current_user = get_jwt_identity()
        new_post = Post(title=title, body=body, author=get_user_id(current_user))
        new_post.save()
        return jsonify(new_post)
    return Response("Cannot add post", status=400)


def change_password_service(old_password, new_password):
    user = User.objects(email=get_jwt_identity()).first()
    new_hash = generate_password_hash(new_password, method='sha256')
    if check_password_hash(user.get_password_hash(), old_password):
        if old_password != new_password:
            print(user.get_password_hash())
            user.set_password_hash(new_hash)
            user.save()
            print(user.get_password_hash())
            return Response("Password changed successfully!", status=200)
        else:
            return Response("Password cannot match!", status=304)
    else:
        return Response("Wrong password!", status=304)


def get_posts_from_user(username):
    user = User.objects(username=username).first()
    print(user.id)
    posts = Post.objects(author=user.id).all()
    return posts


def get_all_posts():
    posts = Post.objects().all()
    return posts


def load_posts_with_offset_service(number, offset):
    start = int(offset)
    stop = int(number) + int(offset)
    posts = Post.objects.order_by('-createdAt')[start:stop]
    return posts

