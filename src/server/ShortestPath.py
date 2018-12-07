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


def get_shortest_path(graph, source, target, weight='length'):
    frontier = []
    heappush(frontier, (0, source))
    came_from = {}
    cost_so_far = {}
    came_from[source] = None
    cost_so_far[source] = 0

    while len(frontier) != 0:
        (val, current) = heappop(frontier)
        if current == target:
            break
        for u, nxt, data in graph.edges(current, data=True):
            new_cost = cost_so_far[current]
            if weight == 'length':
                incCost = self.getcost(graph, u, nxt)
            elif weight == 'elevation':
                incCost = self.getelevationcost(graph, u, nxt)
            if incCost > 0:
                new_cost += incCost
            if nxt not in cost_so_far or new_cost < cost_so_far[nxt]:
                cost_so_far[nxt] = new_cost
                priority = new_cost
                heappush(frontier, (priority, nxt))
                came_from[nxt] = current
    return self.getpath(came_from, source, target)
