class PriorityQueue(object):

    """ Summary of Class
    Priority Queue class used for 2-Dimensional dictionary
    ordering reverse key finding. In particular, we trave-
    rse first dimension first, then order according to se-
    cond dimension. Every ejection will give a tuple cons-
    isting of first and second dimension data, followed by
    a reverse key.

    Attributes:
    -   queue: Used to store distance and a certain score
    -   reverse_key: Used to store the key corresponding
        to a certain distance - score pair

    Methods:
    -   push: accept a tuple ((distance, score), key) and
        store in self.queue, self.reverse_key respectively
        If got repitition then will replace former score
    -   pop: get a tuple of smallest distance with smalle-
        st score. It's following dictionary order

    """

    def __init__(self):
        super().__init__()
        self.queue = []
        self.reverse_key = []

    def _insert(self, data_tuple):
        # Return a position tuple for keys to be inserted
        if len(self.queue[data_tuple[0]]) == 0:
            self.queue[data_tuple[0]].append(data_tuple[1])
            return (data_tuple[0], 0)
        else:
            left_element = 0
            right_element = len(self.queue[data_tuple[0]])
            while(right_element - left_element):
                middle_element = int((right_element + left_element) / 2)
                if self.queue[data_tuple[0]][middle_element] < data_tuple[1]:
                    # print(f"{data_tuple[1]} is less than {self.queue[data_tuple[0]][middle_element]} at position {middle_element}")
                    right_element = middle_element
                elif self.queue[data_tuple[0]][middle_element] >= data_tuple[1]:
                    # print(f"{data_tuple[1]} is larger than {self.queue[data_tuple[0]][middle_element]} at position {middle_element}")
                    left_element = middle_element + 1
            self.queue[data_tuple[0]].insert(left_element, data_tuple[1])
            return (data_tuple[0], left_element)

    def push(self, data_pair):
        # Push a certain data pair with its key
        while(data_pair[0][0] > len(self.queue) - 1):
            self.queue.append([])
            self.reverse_key.append([])
        if data_pair[1] in self.reverse_key[data_pair[0][0]]:
            position = self.reverse_key[data_pair[0][0]].index(data_pair[1])
            self.queue[data_pair[0][0]][position] = data_pair[0][1]
        else:
            position = self._insert(data_pair[0])
            self.reverse_key[position[0]].insert(position[1], data_pair[1])

    def pop(self, pos = -1):
        # Return smallest tuple by default with its key
        for index in range(len(self.queue)):
            if self.queue[index]:
                return ((index, self.queue[index].pop(pos)), self.reverse_key[index].pop(pos))
        return ((None, None), None)