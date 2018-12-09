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


def get_elevation_gain(G, u, v):
    return G.nodes[u]['elevation'] - G.nodes[v]['elevation']


def get_length(G, u, v):
    return G.edges[u, v, 0]['length']

def get_closest_node_from_gps(G,x,y):

def get_shortest_path(G,):
    
def get_path_betwen_two_point(came_from, origin, destination):
    path = []
    p = destination
    path.append(p)
    while p != origin:
        p = came_from[p]
        path.append(p)
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
