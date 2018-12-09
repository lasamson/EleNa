import osmnx as ox
import pickle as pkl
from pathlib import Path
import os
import requests

import math
import time
import requests
import pandas as pd
import networkx as nx

from osmnx.core import save_to_cache
from osmnx.core import get_from_cache
from osmnx.utils import log

import sys
import osmnx as ox
import networkx as nx
import numpy as np
from heapq import *
from itertools import count

from heapq import *
from collections import OrderedDict
import numpy as np


def get_elevation_gain(G, start, end):
    return G.nodes[start]['elevation'] - G.nodes[end]['elevation']


def get_length(G, start, end):
    return G.edges[start, end, 0]['length']


def is_gps_in_map(G, (lat, lng)):
    n, d = ox.get_nearest_node(G, (lat, lng), return_dist=True)
    if d > 10000:
        return False
    return True


def get_closest_node(G, (lat, lng)):
    return ox.get_nearest_node(G, (lat, lng))


def generate_path(revPath, start, end):
    path = []
    n = end
    path.append(n)
    while n != start:
        n = revPath[n]
        path.append(n)
    return path[::-1]


def get_path_elevation(G, path):
    total_elevation = 0

    for i in range(len(path) - 1):
        curr_elevation = get_elevation_gain(G, path[i], path[i + 1])
        if curr_elevation > 0:
            total_elevation += curr_elevation

    return total_elevation


def get_path_length(G, path):
    total_length = 0

    for i in range(len(path) - 1):
        total_length += get_length(G, path[i], path[i + 1])

    return total_length

def get_lat_long(G, path):
    coord = []
    for node in path:
        coord.append((G.nodes[node]['y'], G.nodes[node]['x']))
    return coord

def get_shortest_path(G, start, end, option='length'):
    queue = []
    heappush(queue, (0, start))
    revPath = {}
    cost = {}
    revPath[start] = None
    cost[start] = 0

    while len(queue) > 0:
        (val, current) = heappop(queue)
        if current == end:
            break
        for cur, nxt, data in G.edges(current, data=True):
            new_cost = cost[current]
            if option == 'length':
                curCost = get_length(G, cur, nxt)
            elif option == 'elevation':
                curCost = get_path_elevation(G, cur, nxt)
            if curCost > 0:
                new_cost += curCost
            if nxt not in cost or new_cost < cost[nxt]:
                cost[nxt] = new_cost
                heappush(queue, (new_cost, nxt))
                revPath[nxt] = current

    return generate_path(revPath, start, end)


def get_euclidean_distance(G, start, end):
    x1, y1 = g.nodes()[start]['x'], g.nodes()[start]['y']
    x2, y2 = g.nodes()[end]['x'], g.nodes()[end]['y']

    dist = ((x2 - x1)**2 + (y2 - y1)**2)**0.5

    return dist


def get_all_paths(G, start, end, percent, max_ele=True):
    min_distance = get_path_length(g, get_shortest_path(G, start, end))
    shortest_paths = list(nx.all_shortest_paths(G, start, end))
    max_path_length = (1.0 + percent) * min_distance

    elevation_gain = {}
    for p in shortest_paths:
        path_dist = get_path_length(G, p)
        if path_dist > max_path_length:
            print(min_distance, max_path_length)
            continue
        elevation_gain[get_path_elevation(g, p)] = p

    ordered_paths = OrderedDict(sorted(elevation_gain.items()))

    keys = ordered_paths.keys()

    if max_ele:
        key = max(elevation_gain.iterkeys(), key=(lambda key: elevation_gain[key]))
    else:
        key = min(elevation_gain.iterkeys(), key=(lambda key: elevation_gain[key]))

    return elevation_gain[key]
