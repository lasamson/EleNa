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

def get_city_country(lat, lon):
    """ Get City, Country based on Lat, Long Coordinates """
    url = "http://maps.googleapis.com/maps/api/geocode/json?"
    url += "latlng=%s,%s&sensor=false" % (lat, lon)
    v = urlopen(url).read()
    j = json.loads(v)
    components = j['results'][0]['address_components']
    country = town = None
    for c in components:
        if "country" in c['types']:
            country = c['long_name']
        if "postal_town" in c['types']:
            town = c['long_name']
    return town, country

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
    percentage = content["Percentage"]

    # convert the source,destination addresses to lat,lng coordinates
    source_lat, source_lng = convert_addresss_to_lat_lng(source)
    dest_lat, dest_lng = convert_addresss_to_lat_lng(destination)

    # get the city, country of the source
    city, country = get_city_country(source_lat, source_lng)

    # find the best path between source & destination based on elevation
    route = find_route(source_lat, source_lng)
    print(route)

    # send a response back (w/ the route)
    response = jsonify({'Route': 'Map Route Object'})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    app.run(port=8080)
