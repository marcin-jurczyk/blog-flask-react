from flask import Response, jsonify
from flask_jwt_extended import create_access_token, get_jwt_identity
from werkzeug.security import check_password_hash, generate_password_hash

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
            return jsonify({
                'Bearer token': create_access_token(identity=email, expires_delta=False)
            })
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


def change_password_service(current_password, new_password):
    # get currently logged user
    user = User.objects(email=get_jwt_identity()).first()

    if check_password_hash(user.get_password_hash(), current_password):
        if current_password != new_password:
            new_hash = generate_password_hash(new_password, method='sha256')
            user.set_password_hash(new_hash)
            user.save()
            return Response("Password changed successfully!", status=200)
        else:
            return Response("Password cannot match!", status=403)
    else:
        return Response("Wrong password!", status=403)


def change_username_service(current_username, new_username):
    # get currently logged user
    user = User.objects(email=get_jwt_identity()).first()

    # check if user is logged in
    if user.username != current_username:
        return Response("Username does not match!", status=403)
    else:
        if current_username == new_username:
            return Response("Your new username must not match current!", status=409)
        elif User.objects(username=new_username).first() is None:
            user.username = new_username
            user.save()
            return jsonify(user)
        else:
            return Response(f"User with username: \"{new_username}\" already exists", status=409)


def change_email_service(old_email, new_email):
    # get currently logged user
    user = User.objects(email=get_jwt_identity()).first()

    # check if user is logged in
    if old_email != user.email:
        return Response("E-mail does not match!", status=403)
    else:
        if old_email == new_email:
            Response("Your new username must not match current", status=409)
        elif User.objects(email=new_email).first() is None:
            user.email = new_email
            user.save()
            return jsonify(user)
        else:
            return Response(f"User with email: \"{new_email}\" already exists", status=409)
