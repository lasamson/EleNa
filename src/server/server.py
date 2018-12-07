import os
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

@app.route("/get_route", methods=["POST"])
def get_route():
    content = request.get_json()

    source = content["Source"]
    destination = content["Destination"]
    max_min = content["Max_min"]
    percentage = content["Percentage"]

    # send a response bacck (w/ the route)
    response = jsonify({'Route': 'Map Route Object'})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    app.run(port=8080)
