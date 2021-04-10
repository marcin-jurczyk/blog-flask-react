# from flask import Flask
# import db
#
# app = Flask(__name__)
#
#
# class User(object):
#     def __init__(self, id, username, password):
#         self.id = id
#         self.username = username
#         self.password = password
#
#     def __str__(self):
#         return f"User id: {self.id}"
#
#
# @app.route('/')
# def flask_mongodb_atlas():
#     return "flask mongodb atlas!"
#
#
# # test to insert data to the data base
# @app.route("/test")
# def test():
#     # db.db.collection.insert_one({"name": "John"})
#     db.database.user.insert_one({"name": "Marcin"})
#     return
#
#
# if __name__ == '__main__':
#     app.run(debug=True)
