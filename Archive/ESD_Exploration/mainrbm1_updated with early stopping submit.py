import numpy as np
import rbm
import projectLib as lib
import matplotlib.pyplot as plt
import math
import time
import datetime
import copy

training = lib.getTrainingData()
validation = lib.getValidationData()
trStats = lib.getUsefulStats(training)
vlStats = lib.getUsefulStats(validation)

K = 5

# SET PARAMETERS HERE!!!
F = 15
epochs = 15
gradientLearningRate = []
gradientLearningRate.append(0.05)
# number of hidden units
#F
#epochs
#gradientLearningRate

# Initialise all our arrays
W = rbm.getInitialWeights(trStats["n_movies"], F, K)
grad = np.zeros(W.shape)
posprods = np.zeros(W.shape)
negprods = np.zeros(W.shape)
tr_errors = []
val_errors = []
val_errors2 = []
tr_errors2 = []
weights = []

for epoch in range(1, epochs):
    # in each epoch, we'll visit all users in a random order
    visitingOrder = np.array(trStats["u_users"])
    np.random.shuffle(visitingOrder)

    for user in visitingOrder:
        # get the ratings of that user
        ratingsForUser = lib.getRatingsForUser(user, training)

        # build the visible input
        v = rbm.getV(ratingsForUser)

        # get the weights associated to movies the user has seen
        weightsForUser = W[ratingsForUser[:, 0], :, :]

        ### LEARNING ###
        # propagate visible input to hidden units
        posHiddenProb = rbm.visibleToHiddenVec(v, weightsForUser)
        # get positive gradient
        # note that we only update the movies that this user has seen!
        posprods[ratingsForUser[:, 0], :, :] = rbm.probProduct(v, posHiddenProb)

        ### UNLEARNING ###
        # sample from hidden distribution
        sampledHidden = rbm.sample(posHiddenProb)
        # propagate back to get "negative data"
        negData = rbm.hiddenToVisible(sampledHidden, weightsForUser)
        # propagate negative data to hidden units
        negHiddenProb = rbm.visibleToHiddenVec(negData, weightsForUser)
        # get negative gradient
        # note that we only update the movies that this user has seen!
        negprods[ratingsForUser[:, 0], :, :] = rbm.probProduct(negData, negHiddenProb)

        # we average over the number of users in the batch (if we use mini-batch)
        grad[ratingsForUser[:, 0], :, :] = gradientLearningRate * (posprods[ratingsForUser[:, 0], :, :] - negprods[ratingsForUser[:, 0], :, :])

        W[ratingsForUser[:, 0], :, :] += grad[ratingsForUser[:, 0], :, :]
        
        weights.append(W)

    # Print the current RMSE for training and validation sets
    # this allows you to control for overfitting e.g
    # We predict over the training set
    tr_r_hat = rbm.predict(trStats["movies"], trStats["users"], W, training)
    trRMSE = lib.rmse(trStats["ratings"], tr_r_hat)
    trMAE = lib.mae(trStats["ratings"], tr_r_hat)

    # We predict over the validation set
    vl_r_hat = rbm.predict(vlStats["movies"], vlStats["users"], W, training)
    vlRMSE = lib.rmse(vlStats["ratings"], vl_r_hat)
    vlMAE = lib.mae(vlStats["ratings"], vl_r_hat)
    

    print("### EPOCH %d ###" % epoch)
    print("Training loss = %f" % trRMSE)
    print("Validation loss = %f" % vlRMSE)
    tr_errors.append(trRMSE)
    tr_errors2.append(trMAE)
    val_errors.append(vlRMSE)
    val_errors2.append(vlMAE)
print("trmse " + str(trRMSE))
print("validation mse " + str(vlRMSE))

actual_best_trRMSE = min(tr_errors)
actual_best_vlRMSE = min(val_errors)
actual_best_vlMAE = min(val_errors2)


best_val_RMSE_idx = val_errors.index(min(val_errors))
best_val_W = weights[best_val_RMSE_idx]

print("\nbest_vlRMSE", actual_best_vlRMSE)
print("\nbest_vlMAE", actual_best_vlMAE)
#print("\nearly-stopping best weights", best_val_W )

print(f"best_valRMSE_idx: {best_val_RMSE_idx}")
print(f"best_valRMSE_epoch: {best_val_RMSE_idx+1} \n")

