import os
from flask import Flask, render_template, request
app = Flask(__name__)

@app.route("/get_route", methods=["POST"])
def get_route():
    content = request.get_json()
    print(content)
    source = content["Source"]
    destination = content["Destination"]
    max_min = content["Max_min"]
    percentage = content["Percentage"]

    print("Sending Data to Algorithm...")
    print("Source: {}".format(source))
    print("Destination: {}".format(destination))
    print("Max_min: {}".format(max_min))
    print("Percentage: {}".format(percentage))

    print("Getting optimal route...")
    print("Sending data to the MapView...")
    # route = algorithm(source, destination, max_min, percentage)
    # process route into json object
    return "Sending Optimal Route back..."

if __name__ == "__main__":
    app.run(port=8080)
