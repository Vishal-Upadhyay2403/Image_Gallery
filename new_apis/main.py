import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
import requests
from markupsafe import escape
import json
from werkzeug import Response
from flask_cors import CORS
from mongo_client import mongo_client

gallery = mongo_client.gallery
images_collection = gallery.images

load_dotenv(dotenv_path = "./.env.local")



UNSPLASH_URL = "https://api.unsplash.com/photos/random"
UNSPLASH_KEY = os.environ.get("UNSPLACE_KEY", "")
DEBUG = os.environ.get("DEBUG", True)

if not UNSPLASH_KEY:
    raise EnvironmentError("please create .env.local file and insert there UNSPLACE_KEY!!!")

app = Flask(__name__)

CORS(app)

app.config["DEBUG"] = DEBUG

#insert_test_document()

@app.route("/new-image")
def new_image():
    word = request.args.get("query")

    headers = {
        "Accept-Version" : "v1",
        "Authorization" : "Client-ID " + UNSPLASH_KEY
    }
    params = {
        "query" : word
    }
    response = requests.get(url=UNSPLASH_URL, headers= headers, params=params)

    data = response.json();

    return data;


@app.route("/images",methods =["GET","POST"])
def images():
    if request.method == "GET":
        #read images from DB
        images = images_collection.find({})
        result = []
        for img in images:
            img['_id'] = str(img['_id'])
            result.append(img)
        return jsonify(result)
    
    if request.method == "POST":
        #save image from DB
        image = request.get_json()
        image["_id"] = image.get("id")
        result = images_collection.insert_one(image)
        inserted_id = result.inserted_id
        return jsonify("inserted id :", inserted_id)

@app.route("/images/<image_id>",methods = ["DELETE"])
def image(image_id):
    if request.method == "DELETE":
        #delete image from database
        result = images_collection.delete_one({
           "_id" : image_id 
        })
      #  print(result.deleted_count);
        if not result:
            return {"error" : "Image wasn't deleted. Please try again"}, 500
        if result and not result.deleted_count:
            return {"error" : "Image not found"}, 404
        return {"deleted_id" : image_id}


if __name__ == "__main__":
    app.run(host= "0.0.0.0",port=5050)
    