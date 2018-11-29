import osmnx as ox
import pickle as pkl

ox.config(log_file=True, log_console=True, use_cache=True)

def get_map(city,state, newPlace=False):
    if newPlace == False:
        pkl._load(open("%s%s_projected.pkl"% (city,state),"rb")), pkl.load(open("%s%s.pkl"% (city,state),"rb"))
    place_query = {'city':city , 'state':state, 'country':'USA'}
    graph = ox.graph_from_place(place_query)


