#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Mar 31 15:30:31 2021

@author: pjpei
"""

import numpy as np
from matplotlib import pyplot
import projectLib as lib
from matplotlib import pyplot as plt
import numpy

# shape is movie,user,rating
training = lib.getTrainingData()
validation = lib.getValidationData()

#some useful stats
trStats = lib.getUsefulStats(training)
rBar = np.mean(trStats["ratings"])

valStats = lib.getUsefulStats(validation)

# we get the A matrix from the training dataset
def getA(training):
    A = np.zeros((trStats["n_ratings"], trStats["n_movies"] + trStats["n_users"]+10))
    # ???
    for i in range(trStats["n_ratings"]):
        A[i][trStats["movies"][i]] = 1
        A[i][trStats["n_movies"] + trStats["users"][i]] = 1
    return A

# we also get c
def getc(rBar, ratings):
    # ???
    return np.array([ratings[i]-rBar for i in range(len(ratings))])

# apply the functions
A = getA(training)
c = getc(rBar, trStats["ratings"])

# compute the estimator b
def param(A, c):
    # ???
    inverse = np.linalg.pinv(A.transpose().dot(A))
    b = inverse.dot(A.transpose()).dot(c)
    b = np.array(b).flatten()
    return b

# compute the estimator b with a regularisation parameter l
# note: lambda is a Python keyword to define inline functions
#       so avoid using it as a variable name!
def param_reg(A, c, l):
    # ???
    #print(A.shape)
    inverse = np.linalg.pinv(A.transpose().dot(A) + l * np.identity(A.shape[1]))  # inv(ATA + lamda*I)
    b = inverse.dot(A.transpose()).dot(c)
    return b

# from b predict the ratings for the (movies, users) pair
def predict(movies, users, rBar, b):
    n_predict = len(users)
    p = np.zeros(n_predict)
    for i in range(0, n_predict):
        rating = rBar + b[movies[i]] + b[trStats["n_movies"] + users[i]]
        if rating > 5: rating = 5.0
        if rating < 1: rating = 1.0
        p[i] = rating
    return p

def predictForUser(user, rBar, b):
    movies = trStats["u_movies"]
    users = np.array([user] * trStats["n_movies"])
    return predict(movies, users, rBar, b)


# construct user-movie rating matrix


# Unregularised version
b = param(A, c)

# Regularised version

l_l = numpy.linspace(6, 7, num=20)
l_rmse = []
l_mae = []
min_l = 99
min_rmse = 99
min_mae = 99
for l in l_l:
    b = param_reg(A, c, l)
    #print ("Linear regression, l = %f" % l)
    rmse = lib.rmse(predict(valStats["movies"], valStats["users"], rBar, b), valStats["ratings"])
    mae = lib.mae(predict(valStats["movies"], valStats["users"], rBar, b), valStats["ratings"])
    #print (rmse)
   # print (mae)
    l_rmse.append(rmse)
    l_mae.append(mae)
    if min_rmse > rmse:
        min_l = l
        min_rmse = rmse
    if min_mae > mae:
        min_mae = mae
print(rmse)
print(mae)




#plt.plot(l_l, l_rmse, 'ro')
#plt.axis([6, 7, 1.069, 1.070])
#plt.title("RMSE vs l (Min: %f,%f)" % (min_l, min_rmse))
#plt.show()


# print(trStats["n_users"])
#
# print(trStats["n_movies"])
# predictedRatings = np.array([predictForUser(user, rBar, b) for user in trStats["u_users"]])
# np.savetxt("predictedRatings.txt", predictedRatings)