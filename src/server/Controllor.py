import Algorithm
import MakeMapsOpen


def find_route(city, state, start, end, percentage):

    G, G_projected = MakeMapsOpen.get_map(city, state)

    if Algorithm.is_gps_in_map(G, start) and Algorithm.is_gps_in_map(G, end):
        startN = Algorithm.get_closest_node(G, start)
        endN = Algorithm.get_closest_node(G, end)

        p = Algorithm.astar_path(G, startN, endN, percentage, max_ele=False)
        return Algorithm.get_lat_long(G, p)
    else:
        print "not in map"


print (find_route("Amherst", "MA", (42.368749, -72.49561), (42.3762084, -72.5196859), 0.5))
