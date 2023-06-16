from csv import DictReader
from math import exp, log
from os import getcwd

import numpy as np
from Edge import Edge
from Node import Node
from PriorityQueue import PriorityQueue


class KnowledgeGraph(object):

    """ Summary of Class

    Knowledge Graph class. Work as an operator on Node and Edge
    Classes. Recommendation can also be done with this class.

    Attributes:
    -   _nodes: stores all the nodes in a hash table. We can do
        fast searching by using its name
    -   _edges: stores all the edges in a 2d hash table, denote
        its starting node and end node
    -   _gamma: coefficient used for calculating final scores
    -   _alpha: coefficient used for calculating decays

    Methods:
    -   get_node(name): takes in the name of the node then ret-
        urn the node
    -   are_connected(node1_name, node2_name): check if 2 nodes
        are connected
    -   get_score(node1_name, distance): takes in a node name &
        a distance to calculate the scores so that we know what
        node to recommend
    -   recommend(n): recommend according to scores calculated,
        maximum n recommendees

    """

    def __init__(self, nodes, edges, gamma = 0.05, alpha = 0.82):
        super().__init__()
        # Build graph using hash table
        self._gamma = gamma
        self._alpha = alpha
        self._nodes = {}
        self._edges = {}
        for node in nodes:
            self._nodes[node.name] = node
            self._edges[node.name] = {}
        for edge in edges:
            self._edges[edge.start_node][edge.end_node] = edge


    def get_node(self, name):
        # Implementation using dictionary
        assert name in self._nodes
        return self._nodes[name]


    def del_node(self, name):
        # Implementation using dictionary
        assert name in self._nodes
        del(self._nodes[name])
        # To be completed


    def are_connected(self, node1_name, node2_name):
        # Return true if connected else False
        return node1_name in self._edges and node2_name in self._edges[node1_name]

    def get_score(self, node1_name, distance = 3):
        # Revised Dijkstra Algorithm, default distance set to 3
        _queue = PriorityQueue()
        _scores = {}
        _starting_node = self.get_node(node1_name)
        _predecessors = {_starting_node.name: {0: []}}
        _scores[_starting_node.name] = {0: 0}
        _current_node = _starting_node
        _current_distance = 0
        while(_current_node and _current_distance < distance):
            # BFS
            # print("Currently Processing Starting node: ", _current_node.name)
            _preds = _predecessors[_current_node.name][_current_distance]
            for connected_node_name in self._edges[_current_node.name]:
                # print("Processing Neighbour: ", connected_node_name)
                # Check predecessor first. If connected node appears to be the predecessor of current node, we don't compute the score
                if connected_node_name in _preds:
                    continue
                # The following code is to deal with weird 0 weight
                if self._edges[_current_node.name][connected_node_name].get_weight() <= 0:
                    temp_score = _scores[_current_node.name][_current_distance] - log(0.01) - _current_distance * log(self._alpha)
                else:
                    temp_score = _scores[_current_node.name][_current_distance] - log(self._edges[_current_node.name][connected_node_name].get_weight()) - _current_distance * log(self._alpha)
                if connected_node_name not in _scores:
                    _scores[connected_node_name] = {_current_distance + 1: temp_score}
                    _predecessors[connected_node_name] = {_current_distance + 1: _preds + [_current_node.name]}
                    _queue.push(((_current_distance + 1, temp_score), self.get_node(connected_node_name)))
                elif _current_distance + 1 not in _scores[connected_node_name] or temp_score < _scores[connected_node_name][_current_distance + 1]:
                    _scores[connected_node_name][_current_distance + 1] = temp_score
                    _predecessors[connected_node_name][_current_distance + 1] = _preds + [_current_node.name]
                    _queue.push(((_current_distance + 1, temp_score), self.get_node(connected_node_name)))
            ((_current_distance, _), _current_node) = _queue.pop()
            # print("New Score: ", _scores)
        # Apply penalty
        _results = {}
        del(_scores[node1_name])
        for node_name in _scores:
            temp_result = None
            for node_distance in _scores[node_name]:
                temp_score = exp(- _scores[node_name][node_distance] / node_distance) * ((node_distance + 1) / node_distance) ** node_distance
                penalty = 0
                average_num = 0
                for index in range(len(_predecessors[node_name][node_distance]) - 1):
                    average_num += self._edges[_predecessors[node_name][node_distance][index]][_predecessors[node_name][node_distance][index + 1]].get_weight()
                average_num += self._edges[_predecessors[node_name][node_distance][-1]][node_name].get_weight()
                average_num /= len(_predecessors[node_name][node_distance])
                for index in range(len(_predecessors[node_name][node_distance]) - 1):
                    penalty += (self._edges[_predecessors[node_name][node_distance][index]][_predecessors[node_name][node_distance][index + 1]].get_weight() - average_num) ** 2
                penalty += (self._edges[_predecessors[node_name][node_distance][-1]][node_name].get_weight() - average_num) ** 2
                penalty *= self._gamma / len(_predecessors[node_name][node_distance])
                temp_score -= penalty

                if temp_result == None or temp_score > temp_result[1]:
                    temp_result = (node_distance, temp_score)
            _results[node_name] = (temp_result, _predecessors[node_name][temp_result[0]])
        print("Final result:", _results)
        return _results

    def recommend(self, node1_name, distance = 3, constraint_num = 10):
        # Implement sorting system
        _results = self.get_score(node1_name, distance)
        _return_results = {}
        _recomendees = []
        _data_tuples = []
        left_pointer = 0
        right_pointer = 0
        for precedent in _results:
            # if self.get_node(precedent).node_type != "to_recommend":
            #     continue
            data_tuple = _results[precedent]
            if not _recomendees:
                _recomendees.append(precedent)
                _data_tuples.append(data_tuple)
                left_pointer = 0
                right_pointer = 1
            else:
                middle_pointer = 0
                left_pointer = 0
                right_pointer = len(_data_tuples)
                while(left_pointer != right_pointer):
                    middle_pointer = int((left_pointer + right_pointer) / 2)
                    if _data_tuples[middle_pointer][0][1] <= data_tuple[0][1]:
                        right_pointer = middle_pointer
                        continue
                    else:
                        left_pointer = middle_pointer + 1
                        continue
                _recomendees.insert(middle_pointer, precedent)
                _data_tuples.insert(middle_pointer, data_tuple)
        for index in range(min(len(_recomendees), constraint_num)):
            _return_results[_recomendees[index]] = _data_tuples[index]
        print(_return_results)
        return _return_results

    @staticmethod
    def load_from_csv(file_descriptor, name_file):
        # Delete all name_file related code after deta neing cleaned
        name_list = open(getcwd() + file_descriptor + "names.txt").read().split("\n")
        with open(getcwd() + file_descriptor + 'KG_Visualisation_Nodes.csv', 'r', encoding='utf-8-sig') as csv_file:
            dict_reader = DictReader(csv_file)
            list_of_dict_nodes = list(dict_reader)
        node_list = []
        for i in range(len(list_of_dict_nodes)):
            if list_of_dict_nodes[i]['Name'] in name_list:
                # node = Node(node_type='to_recommend', node_subtype=list_of_dict_nodes[i]['type'],name=list_of_dict_nodes[i]['Name'])
                if list_of_dict_nodes[i]['type'] == 'Precedents':
                    node = Node(node_type='to_recommend', node_subtype=list_of_dict_nodes[i]['type'],name=list_of_dict_nodes[i]['Name'])
                else:
                    node = Node(node_type='to_not_recommend', node_subtype=list_of_dict_nodes[i]['type'],name=list_of_dict_nodes[i]['Name'])
                node_list.append(node)
                
        with open(getcwd() + file_descriptor + 'KG_Visualisation_Edges.csv', 'r', encoding='utf-8-sig') as csv_file:
            dict_reader = DictReader(csv_file)
            list_of_dict_edges = list(dict_reader)
        edge_list = []
        for i in range(len(list_of_dict_edges)):
            if list_of_dict_edges[i]['From Name'] in name_list and list_of_dict_edges[i]['To Name'] in name_list:
                edge = Edge(edge_type=list_of_dict_edges[i]['Edge'], 
                start_node=list_of_dict_edges[i]['From Name'], end_node=list_of_dict_edges[i]['To Name'], weight=float(list_of_dict_edges[i]['Weight']), 
                start_node_subtype=list_of_dict_edges[i]['From Type'], end_node_subtype=list_of_dict_edges[i]['To Type'])
                edge_list.append(edge)
        # return node_list, edge_list
        return KnowledgeGraph(node_list, edge_list)


    @staticmethod
    def save_to_csv(file_descriptor):
        pass
