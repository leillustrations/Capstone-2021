import numpy as np

class Tree(object):
    """ Class Summary
    RB-Tree implementation
    True means black nodes and False means red nodes

    Attributes:
    _keys: private variable to store all the keys
    _pointers: private variable to store all the pointers, corresponding
    to the vars stored in _keys
    root: public var to show the root of the tree

    Methods:
    _balance: balance the tree
    insert_node: takes in key and pointer to insert a specific node
    delete_node: takes in key to del a specific node
    get_node: takes in key to find the pointer of a specific node
    """

    def __init__(self, keys, pointers):
        super().__init__()
        assert len(keys) == len(pointers)
        self._keys = []
        self._pointers = []
        self.root = None
        for i in range(len(keys)):
            key = keys.pop()
            pointer = pointers.pop()
            self._keys.append(key)
            self._pointers.append(pointer)
            self.insert_node(key, pointer)

    def _balance(self, node):
        pass

    def insert_node(self, key, pointer):
        node = Branch(key, pointer)
        if self.root == None:
            self.root = node
            self.root.color = True
        else:
            current_node = self.root
            while(current_node):
                if node.key <= current_node.key:
                    if current_node.left_child == None:
                        current_node.left_child = node
                        node.parent = current_node
                        break
                    else:
                        current_node = current_node.left_child
                else:
                    if current_node.right_child == None:
                        current_node.right_child = node
                        node.parent = current_node
                        break
                    else:
                        current_node = current_node.right_child
            self._balance()

    def delete_node(self, key):
        pass

    def get_node(self, key):
        current_node = self.root
        while(current_node):
            if current_node.key == key:
                break
            elif key < current_node.key:
                current_node = current_node.left_child
                continue
            else:
                current_node = current_node.right_child
                continue
        return current_node


class Branch(object):
    """ Class Summary
    This helper class is a branch of a tree, for better implementation
    of an Red-Black Tree.

    Attributes:
    key: Used for comparison to construct the tree
    pointer: pointer pointing to the original object
    parent: parent branch. If None, it is a root node
    left_child: 
    right_child:
    color: False is red
    """

    def __init__(self, key, pointer, parent = None, left_child = None, right_child = None, color = False):
        self.key = key,
        self.pointer = pointer
        self.parent = parent
        self.left_child = left_child
        self.right_child = right_child
        self.color = color