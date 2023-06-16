from utils.Node import Node
from utils.Edge import Edge
from utils.KnowledgeGraph import KnowledgeGraph
from utils.PriorityQueue import PriorityQueue
from utils.Tree import Tree
import os
pwd = os.getcwd()

node1 = Node(node_type='to_not_recommend',
             node_subtype='materials', name='Brick')
node3 = Node(node_type='to_not_recommend', node_subtype='architect',
             name='Frank Gehry')

node2 = Node(node_type='to_recommend', node_subtype='precedent',
             name='Bilbao Guggenheim Museum')
node4 = Node(node_type='to_recommend', node_subtype='precedent',
             name='Baker House')

edge1 = Edge('built using', node2, node1, 0.4)

edge2 = Edge('designed by', node4, node3, 0.8)


edges_df = KnowledgeGraph.load_from_csv(pwd + '/KG_Implementation/KG_Data/KG_Visualisation_Edges.csv')
nodes_df = KnowledgeGraph.load_from_csv(pwd + '/KG_Implementation/KG_Data/KG_Visualisation_Nodes.csv')

print(edges_df)
print(nodes_df)

# print(node1)
# print(node1.is_connected())
# print(node1.to_recommend())
# print(node1.get_pointer())
# print(node1.get_connections())

# print(edge1, edge2)


