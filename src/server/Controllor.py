import Algorithm
import MakeMapsOpen


def runit(start,end):

    G, G_projected = MakeMapsOpen.get_map('Amherst','MA')

    if Algorithm.is_gps_in_map(G,start) and Algorithm.is_gps_in_map(G,end):
        startN  = Algorithm.get_closest_node(G,start)
        endN = Algorithm.get_closest_node(G,end)
        return Algorithm.get_shortest_path(G,startN,endN,'length')
    else:
        print "not in map"

