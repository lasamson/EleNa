import Algorithm
import MakeMapsOpen


def find_route(city, state, start, end, percentage):

    G, G_projected = MakeMapsOpen.get_map(city, state)

    if Algorithm.is_gps_in_map(G, start) and Algorithm.is_gps_in_map(G, end):
        startN = Algorithm.get_closest_node(G, start)
        endN = Algorithm.get_closest_node(G, end)

        p = Algorithm.get_from_djikstra(G, startN, endN, percentage,True)
        print Algorithm.get_path_length(G,p)
        print Algorithm.get_path_elevation(G,p)

    else:
        print "not in map"

print (find_route("Amherst","MA", (42.383851, -72.528598),
 (42.399529, -72.528260) ,200))
