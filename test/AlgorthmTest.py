import unittest
from src.server.Algorithm import *
from src.server.MakeMapsOpen import *


class AlgorithmTest(unittest.TestCase):
    def setUp(self):
        self.map, self.mapP = get_map('Amherst', 'MA')

    def test_get_elevation_gain(self):
        self.assertEqual(get_elevation_gain(self.map, 66719742, 66745002), 16, 'incorrect n')

    def test_get_length(self):
        self.assertEqual(get_length(self.map, 66719742, 66714920), 150.191, 'incorrect length')

    def test_is_gps_in_map(self):
        self.assertFalse(is_gps_in_map(self.map, (-1, 1)))
        self.assertTrue(is_gps_in_map(self.map, (42.314975, -72.471394)))

    def test_get_closest_node(self):
        self.assertEqual(get_closest_node(self.map, (42.314985, -72.471396)), 66719742)

    def test_generate_path(self):
        self.assertEqual(get_shortest_path(self.map, 66719742, 66613427, 'length'), [66719742, 66678348, 66613427],
                         'wrong shortest path', )

    def test_get_path_elevation(self):
        self.assertEqual(get_path_elevation(self.map, get_shortest_path(self.map, 66719742, 66613427, 'length')), 3,
                         'wrong path elevation', )
        self.assertEqual(get_path_elevation(self.map, [66719742, 66678348, 66613427]), 3, 'wrong path elevation', )

    def test_get_path_length(self):
        self.assertEqual(get_path_length(self.map, get_shortest_path(self.map, 66719742, 66613427, 'length')),
                         696.1949999999999,
                         'wrong path length', )
        self.assertEqual(get_path_length(self.map, [66719742, 66678348, 66613427]), 696.1949999999999,
                         'wrong path length', )

    def test_djikstra(self):
        al, _, _ = get_from_djikstra(self.map, 66700688, 66691585, 200, max_ele=True)
        self.assertEqual(len(al), 22)

        al, _, _ = get_from_djikstra(self.map, 66700688, 66691585, 200, max_ele=False)
        self.assertEqual(len(al), 19)

    def tearDown(self):
        os.remove('AmherstMA.pkl')
        os.remove('AmherstMA_projected.pkl')


if __name__ == '__main__':
    unittest.main()
