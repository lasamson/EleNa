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
