import numpy as np
import pandas as pd
from sklearn.metrics import mean_absolute_error

def getTrainingData():
    df2_train = pd.read_csv('train.csv')
    #df_validaion = df2.iloc[1:int(0.3*len(df2.index)),:]
    return df2_train.to_numpy().astype('int32')#np.genfromtxt("train.csv", delimiter=",", dtype=np.int)

def getValidationData():
    df_validation = pd.read_csv('validation.csv')
    return df_validation .to_numpy().astype('int32')#np.genfromtxt("validation.csv", delimiter=",", dtype=np.int)

def getChapter4Data():
    # chapter 4 training dataset
    return [[0, 0, 5], [2, 0, 5], [3, 0, 4], [1, 1, 1], [2, 1, 1], [3, 1, 4], [0, 2, 4], [1, 2, 1], \
            [2, 2, 2], [3, 2, 4], [0, 3, 3], [1, 3, 4], [3, 3, 3], [0, 4, 1], [1, 4, 5], [2, 4, 3]]

def getUsefulStats(training):
    movies = [x[0] for x in training]
    u_movies = np.unique(movies).tolist()

    users = [x[1] for x in training]
    u_users = np.unique(users).tolist()

    return {
        "movies": movies, # p IDs
        "u_movies": u_movies, # unique p IDs
        "n_movies": len(u_movies)+1, # number of unique precedent

        "users": users, # user IDs
        "u_users": u_users, # unique user IDs
        "n_users": len(u_users), # number of unique users

        "ratings": [x[2] for x in training], # ratings
        "n_ratings": len(training) # number of ratings
    }

def getRatingsForUser(user, training):
    # user is a user ID
    # training is the training set
    # ret is a matrix, each row is [m, r] where
    #   m is the movie ID
    #   r is the rating, 1, 2, 3, 4 or 5
    return np.array([[x[0], x[2]] for x in training if x[1] == user])

# RMSE function to tune your algorithm
def rmse(r, r_hat):
    r = np.array(r)
    r_hat = np.array(r_hat)
    return np.linalg.norm(r - r_hat) / np.sqrt(len(r))

def mae(r, r_hat):
    r = np.array(r)
    r_hat = np.array(r_hat)
    return mean_absolute_error(r,r_hat)
