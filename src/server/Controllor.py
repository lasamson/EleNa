import Algorithm
import MakeMapsOpen


def find_route(city, state, start, end, percentage):

    G, G_projected = MakeMapsOpen.get_map(city, state)

    if Algorithm.is_gps_in_map(G, start) and Algorithm.is_gps_in_map(G, end):
        startN = Algorithm.get_closest_node(G, start)
        endN = Algorithm.get_closest_node(G, end)

        p = Algorithm.dfs_get_all_paths(G, startN, endN, 3000)
        print Algorithm.get_path_length(G,p)
        print Algorithm.get_path_elevation(G,p)

        p = Algorithm.get_all_paths_search(G, startN, endN, percentage, max_ele=True)
        print Algorithm.get_path_length(G,p)
        print Algorithm.get_path_elevation(G,p)

        p = Algorithm.astar_path(G, startN, endN, percentage, max_ele=False)
        return Algorithm.get_lat_long(G, p)
    else:
        print "not in map"

print (find_route("Amherst","MA", (42.374794, -72.518929),
 (42.398794, -72.52805) ,130))
