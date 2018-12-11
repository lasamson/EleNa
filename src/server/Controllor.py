import Algorithm
import MakeMapsOpen


def find_route(city, state, start, end, percentage, max_min):
    G, G_projected = MakeMapsOpen.get_map(city, state)

    if Algorithm.is_gps_in_map(G, start) and Algorithm.is_gps_in_map(G, end):
        startN = Algorithm.get_closest_node(G, start)
        endN = Algorithm.get_closest_node(G, end)

        return Algorithm.get_from_djikstra(G, startN, endN, percentage, max_min)
    else:
        print ("not in map")

