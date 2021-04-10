from flask_pymongo import pymongo

CONNECTION_STRING = "mongodb+srv://mjurczyk:Marcin123@zti.olci5.mongodb.net/blog?retryWrites=true&w=majority"
client = pymongo.MongoClient(CONNECTION_STRING)
database = client.get_database('blog')
# user_collection = pymongo.collection.Collection(db, 'user_collection')