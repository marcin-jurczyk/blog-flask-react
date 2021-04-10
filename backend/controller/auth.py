from flask import Blueprint, request
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required

from service.service import *

auth = Blueprint('auth', __name__)


@auth.after_request
def credentials(response):
    header = response.headers
    header['Access-Control-Allow-Credentials'] = 'true'
    header['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return response


@auth.route('/login', methods=['POST'])
@cross_origin()
def login():
    data = request.get_json()
    return jsonify(login_controller(data['email'], data['password']))


@auth.route('/sign-up', methods=['POST'])
@cross_origin()
def sign_up():
    data = request.get_json()
    return sign_up_controller(data['email'], data['username'], data['password'])


@auth.route('/username/<username>', methods=['GET'])
@jwt_required()
@cross_origin()
def get_user_by_username(username):
    return get_user_info(username, 'USERNAME')


@auth.route('/email/<email>', methods=['GET'])
@jwt_required()
@cross_origin()
def get_user_by_email(email):
    return get_user_info(email, 'EMAIL')


@auth.route('/secret', methods=['GET'])
@jwt_required()
def secret():
    return {
        "message": "access granted"
    }


@auth.route('/change/password', methods=['PUT'])
@jwt_required()
def change_password():
    data = request.get_json()
    old_password = data['password']
    new_password = data['new_password']
    return change_password_service(old_password, new_password)

    # if existing_user is None:
    #
    #     password = generate_password_hash(form.password.data, method='sha256')
    #     new_user = User(email=form.email.data, password=password, username=form.username.data)
    #     new_user.save()
    #     print(new_user)
    #     return Response(new_user, mimetype="application/json", status=200)

#     email = request.form.get('email')
#     username = request.form.get('username')
#     password1 = request.form.get('password1')
#     password2 = request.form.get('password2')
#
#     if len(email) < 4:
#         flash("Email must be greater than 4 characters...", category='error')
#     elif len(username) < 2:
#         flash("First name must be greater than 2 characters...", category='error')
#     elif password1 != password2:
#         flash("Passwords don't match...", category='error')
#     elif len(password1) < 5:
#         flash("Password must be at least 7 characters...", category='error')
#     else:
#
#         User.objects(email=email).first()
#
#         new_user = User(username=username)
#         # add user to db
#         flash("Account created successfully!", category='success')
#
# return render_template("sign-up.html")


# data = request.data
# form = RegistrationForm()
# print(form.email.data)
# print(form.password.data)
# print(form.username.data)
# if request.method == 'POST' and form.validate_on_submit():
#     print('validate')
#     existing_user = User.objects(email=form.email.data).first()
#     if existing_user is None:
#         password = generate_password_hash(form.password.data, method='sha256')
#         new_user = User(email=form.email.data, password=password, username=form.username.data)
#         new_user.save()
#         print(new_user)
#         return Response(new_user, mimetype="application/json", status=200)
# return "bad sign-up"
