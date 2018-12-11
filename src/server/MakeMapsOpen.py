import osmnx as ox
import pickle as pkl
from pathlib import Path
import os

import math
import time
import requests
import pandas as pd
import networkx as nx

from osmnx.core import save_to_cache
from osmnx.core import get_from_cache
from osmnx.utils import log


ox.config(log_file=True, log_console=True, use_cache=True)


def get_map(city, state):
    file_name = "%s%s.pkl" % (city, state)
    projected_file_name = "%s%s_projected.pkl" % (city, state)

    projected_file_path = Path(projected_file_name)
    file_path = Path(file_name)

    if projected_file_path.is_file() and file_path.is_file():
        return pkl.load(open(file_name, "rb")), pkl.load(open(projected_file_name, "rb"))
    else:
        query = {'city': city, 'state': state, 'country': 'USA'}
        graph = ox.graph_from_place(query, network_type='drive')
        graph = add_node_elevations_open(graph)
        graph = ox.add_edge_grades(graph)
        log(graph.nodes[5637885552])
        pkl.dump(graph, open(file_name, "wb"))
        graph_proj = ox.project_graph(graph)
        pkl.dump(graph_proj, open(projected_file_name, "wb"))
        return graph, graph_proj

def check_point_within_city(start, end):

    os.graph_from_place




def add_node_elevations_open(G, max_locations_per_batch=180,
                        pause_duration=0.02): # pragma: no cover

    url_template = 'https://api.open-elevation.com/api/v1/lookup?locations={}'

    node_points = pd.Series({node:'{:.5f},{:.5f}'.format(data['y'], data['x']) for node, data in G.nodes(data=True)})
    log('Requesting node elevations from the API in {} calls.'.format(math.ceil(len(node_points) / max_locations_per_batch)))

    results = []
    for i in range(0, len(node_points), max_locations_per_batch):
        chunk = node_points.iloc[i : i + max_locations_per_batch]
        locations = '|'.join(chunk)
        url = url_template.format(locations)
        log(len(url))
        # check if this request is already in the cache (if global use_cache=True)
        cached_response_json = get_from_cache(url)
        if cached_response_json is not None:
            response_json = cached_response_json
        else:
            try:
                # request the elevations from the API
                log('Requesting node elevations: {}'.format(url))
                time.sleep(pause_duration)
                response = requests.get(url)
                response_json = response.json()
                save_to_cache(url, response_json)
            except Exception as e:
                log(e)
                log('Server responded with {}: {}'.format(response.status_code, response.reason))

        # append these elevation results to the list of all results
        results.extend(response_json['results'])

    # sanity check that all our vectors have the same number of elements
    if not (len(results) == len(G.nodes()) == len(node_points)):
        raise Exception('Graph has {} nodes but we received {} results from the elevation API.'.format(len(G.nodes()), len(results)))
    else:
        log('Graph has {} nodes and we received {} results from the elevation API.'.format(len(G.nodes()), len(results)))

    # add elevation as an attribute to the nodes
    df = pd.DataFrame(node_points, columns=['node_points'])
    df['elevation'] = [result['elevation'] for result in results]
    log(df['elevation'])
    df['elevation'] = df['elevation'].round(3) # round to millimeter
    nx.set_node_attributes(G, name='elevation', values=df['elevation'].to_dict())
    log('Added elevation data to all nodes.')

    return G


def clean(city, state):
    file_name = "%s%s.pkl" % (city, state)
    projected_file_name = "%s%s_projected.pkl" % (city, state)

    os.remove(file_name)
    os.remove(projected_file_name)


get_map('Amherst', 'MA')
# clean('Amherst', 'MA')
