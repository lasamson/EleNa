import os
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS, cross_origin
from urllib2 import urlopen
from geopy.geocoders import Nominatim
import json
from Controllor import find_route

app = Flask(__name__)
CORS(app)
geolocator = Nominatim(user_agent="elena")


def get_city_country(address):
    """ Get city and state from address"""
    address_split = address.split(",")
    town = address_split[1].strip()
    state = address_split[2].strip()
    return town, state


def convert_addresss_to_lat_lng(address):
    """ Convert Address to Lat Long Coodintates """
    location = geolocator.geocode(address)
    return (location.latitude, location.longitude)


@app.route("/get_route", methods=["POST"])
def get_route():
    content = request.get_json()

    source = content["Source"]
    destination = content["Destination"]
    max_min = content["Max_min"]
    percentage = float(content["Percentage"])

    # convert the source,destination addresses to lat,lng coordinates
    source_lat, source_lng = convert_addresss_to_lat_lng(source)
    dest_lat, dest_lng = convert_addresss_to_lat_lng(destination)

    # get the city, country of the source
    city, state = get_city_country(source)
    print(city, state)

    # find the best path between source & destination based on elevation
    route, dist, elevation = find_route(city, state, [source_lat, source_lng], [dest_lat, dest_lng], percentage)
    print(route)
    print(dist)
    print(elevation)

    # send a response back (w/ the route)
    response = jsonify({'Route': route, "Distance": dist, "Elevation Gain": elevation})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == "__main__":
    app.run(port=8080)
