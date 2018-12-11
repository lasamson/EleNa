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
    if start == end:
        return 0
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


def getpath(revPath, origin, destination):
    route_by_length_minele = []
    p = destination
    route_by_length_minele.append(p)
    while p != origin:
        p = revPath[p]
        route_by_length_minele.append(p)
    route_by_length_minele = route_by_length_minele[::-1]
    return route_by_length_minele


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
            cur_cost = cost[current]
            if option == 'length':
                curCost = get_length(G, cur, nxt)
            elif option == 'elevation':
                curCost = get_path_elevation(G, cur, nxt)
            if curCost > 0:
                cur_cost += curCost
            if nxt not in cost or cur_cost < cost[nxt]:
                cost[nxt] = cur_cost
                heappush(queue, (cur_cost, nxt))
                revPath[nxt] = current

    return generate_path(revPath, start, end)


def get_euclidean_distance(G, start, end):
    x1, y1 = G.nodes()[start]['x'], G.nodes()[start]['y']
    x2, y2 = G.nodes()[end]['x'], G.nodes()[end]['y']

    dist = ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5

    return dist


def get_from_all_paths(G, start, end, percent, max_ele=True):
    min_distance = get_path_length(G, get_shortest_path(G, start, end))
    shortest_paths = list(nx.all_shortest_paths(G, start, end))

    print(percent)
    max_path_length = (1.0 + float(percent)) * min_distance

    elevation_gain = {}
    for p in shortest_paths:
        path_dist = get_path_length(G, p)
        if path_dist > max_path_length:
            print(min_distance, max_path_length)
            continue
        elevation_gain[get_path_elevation(G, p)] = p

    ordered_paths = OrderedDict(sorted(elevation_gain.items()))

    keys = ordered_paths.keys()

    if max_ele:
        key = max(elevation_gain.iterkeys(), key=(lambda key: elevation_gain[key]))
    else:
        key = min(elevation_gain.iterkeys(), key=(lambda key: elevation_gain[key]))

    return elevation_gain[key], get_path_elevation(G, elevation_gain[key]), get_path_length(G, elevation_gain[key])


def get_dis_from_percentage(min_distance, percent):
    if percent > 1:
        return (percent) / 100.0 * min_distance
    return (percent) * min_distance


def get_from_djikstra(G, start, end, percent, max_ele=True):
    min_distance = get_path_length(G, get_shortest_path(G, start, end))
    max_path_length = get_dis_from_percentage(min_distance, percent)
    #
    queue = []
    heappush(queue, (0, start))
    revPath = {}
    cost = {}
    cost_ele = {}
    revPath[start] = None
    cost[start] = 0
    cost_ele[start] = 0
    while len(queue) != 0:
        (val, cur) = heappop(queue)
        if cur == end:
            if cost[cur] <= max_path_length:
                break
        for cur, next, data in G.edges(cur, data=True):
            cur_cost = cost[cur] + get_length(G, cur, next)
            cur_ecost = cost_ele[cur]
            ecost = get_elevation_gain(G, cur, next)
            if ecost > 0:
                cur_ecost = cur_ecost + ecost
            if next not in cost or cur_cost < cost[next]:
                cost_ele[next] = cur_ecost
                cost[next] = cur_cost
                if max_ele:
                    priority = -cur_ecost
                else:
                    priority = cur_ecost
                heappush(queue, (priority, next))
                revPath[next] = cur
    path = generate_path(revPath, start, end)

    return get_lat_long(G, path), get_path_length(G, path), get_path_elevation(G, path)


def astar_path(G, source, target, percentage, max_ele=False):
    heuristic = None
    if source not in G or target not in G:
        msg = 'Either source {} or target {} is not in G'
        raise nx.NodeNotFound(msg.format(source, target))

    if heuristic is None:
        # The default heuristic is h=0 - same as Dijkstra's algorithm
        def heuristic(u, v):
            return get_elevation_gain(G, u, v)

    push = heappush
    pop = heappop

    revPath = {}
    revPath[source] = None

    c = 1
    queue = [(0, c, source, 0, None)]

    enqueued = {}
    explored = {}

    while queue:
        # Pop the smallest item from queue.
        _, _, curnode, dist, parent = pop(queue)

        if curnode == target:
            path = [curnode]
            node = parent
            while node is not None:
                path.append(node)
                node = explored[node]
            path.reverse()
            return path, get_path_length(G, path), get_path_elevation(G, path)

        if curnode in explored:
            continue

        explored[curnode] = parent

        for neighbor, w in G[curnode].items():
            if neighbor in explored:
                continue
            # print(neighbor, w[0])
            ncost = dist + w[0]['length']
            if neighbor in enqueued:
                qcost, h = enqueued[neighbor]
                if qcost <= ncost:
                    continue
            else:
                # print(neighbor, target)
                h = heuristic(neighbor, target)
            enqueued[neighbor] = ncost, h
            c += 1
            push(queue, (ncost + h, c, neighbor, ncost, curnode))

    raise nx.NetworkXNoPath("Node %s not reachable from %s" % (source, target))
