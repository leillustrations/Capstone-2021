import numpy as np


class Edge():
    def __init__(self, edge_type, start_node, end_node, weight, start_node_subtype, end_node_subtype):
        # edge types: is part of, designed by, relates to, built using, has style, is
        self.edge_type = edge_type  # type of relation between 2 nodes
        self.weight = weight
        self.start_node = start_node
        self.end_node = end_node
        self.start_node_subtype = start_node_subtype
        self.end_node_subtype = end_node_subtype

        
    def get_edge_type(self):
        return self.edge_type

    def get_weight(self):
        """get weight of connection between this node and another"""

        return self.weight

    def set_weight(self, new_weight):
        """set/change weight of connection between this node and another"""
        self.weight = new_weight

        return self.weight

    def get_start_node(self):
        return self.start_node

    def get_end_node(self):
        return self.end_node

    def __str__(self):
        return str(self.__dict__)
