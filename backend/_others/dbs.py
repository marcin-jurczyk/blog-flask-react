from flask_pymongo import pymongo


CONNECTION_STRING = "mongodb+srv://mjurczyk:Marcin123@zti.olci5.mongodb.net/test?retryWrites=true&w=majority"


client = pymongo.MongoClient(CONNECTION_STRING)
database = client.get_database('test')

# user_collection = pymongo.collection.Collection(db, 'user_collection')