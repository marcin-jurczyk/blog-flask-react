from flask import Blueprint, request
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required

from service.service import *

post = Blueprint('post', __name__)


@post.after_request
def credentials(response):
    header = response.headers
    header['Access-Control-Allow-Credentials'] = 'true'
    header['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return response


@post.route('/new', methods=['POST'])
@jwt_required()
def new_post():
    data = request.get_json()
    title = data['title']
    body = data['body']
    return add_new_post(title, body)


@post.route('/user-posts/<username>', methods=['GET'])
@jwt_required()
def get_user_posts(username):
    return jsonify(get_posts_from_user(username))


@post.route('/all', methods=['GET'])
def all_posts():
    return jsonify(get_all_posts())


@post.route('/last/<number>/<offset>', methods=['GET'])
@cross_origin()
def load_posts_with_offset(number, offset):
    return jsonify(load_posts_with_offset_service(number, offset))
