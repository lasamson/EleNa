import unittest
from src.server.MakeMapsOpen import *

class MakeMapsTest(unittest.TestCase):

    def setUp(self):
        self.map,self.mapP = get_map('Amherst', 'MA')

    def test_elevation_value(self):
        self.assertEqual(self.map.nodes[5637885552]['elevation']
                         , 99,
                         'incorrect elevation')

    def test_output_value(self):
        self.assertEqual(self.map.nodes[5637885552]
                         , {'y': 42.3850694, 'x': -72.5143306, 'elevation': 99, 'osmid': 5637885552},
                         'incorrect value')
    def tearDown(self):
        os.remove('AmherstMA.pkl')
        os.remove('AmherstMA_projected.pkl')


if __name__ == '__main__':
    unittest.main()

