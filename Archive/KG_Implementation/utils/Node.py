import numpy as np
from collections import defaultdict


class Node():
    CONNECTED = True
    RECOMMEND = True

    def __init__(self, node_type, node_subtype, name):
        # Subtypes : precedents, aspects, sub aspects, materials, architects, keywords, style
        self.node_type = node_type
        self.node_subtype = node_subtype
        self.name = name
        # Dict of connected nodes where keys are nodes and values are weights (QN: Does node class really need to store weights? That shd be under edges no?)
        self._connections = {}
        # create unique id/hash value based on node type, subtype and name
        self._pointer = hash((self.node_type, self.node_subtype, self.name))

    def is_connected(self):
        """check if node has links"""

        if not self._connections:
            CONNECTED = False
            return CONNECTED
        else:
            CONNECTED = True
            return CONNECTED

    def to_recommend(self):
        """check if node in question is a node type we want to recommend to user"""

        if self.node_type == 'to_recommend':
            RECOMMEND = True
            return RECOMMEND
        elif self.node_type == 'to_not_recommend':
            RECOMMEND = False
            return RECOMMEND

    def get_pointer(self):
        """get hash value of unique node"""
        return self._pointer

    def get_connections(self):
        """get nodes linked to node1"""
        return self._connections

    # def add_connections(self, node1, node2):
    #     """add new node to connection dict; add node2 to node 1 dict of connections
    # (node class or graph class)"""

    #     pass

    # def del_connections(self, node2):
    #     """add new node to connection dict; add node2 to node 1 dict of connections"""

    #     pass

    # def delete_node(self, node1, node2):
    #     """remove new node to connection dict"""
    #     if node2 in node1.connections.keys():
    #         del node2
    #     else:
    #         return "node not found in connections"

    # def __hash__(self):
    #     return hash((self.node_type,self.node_subtype,self.name))

    def __str__(self):
        return str(self.__dict__)
