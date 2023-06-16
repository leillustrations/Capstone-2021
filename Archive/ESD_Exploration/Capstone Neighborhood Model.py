#!/usr/bin/env python
# coding: utf-8

# In[1]:


import numpy as np
import pandas as pd
import random
from random import sample
from sklearn.model_selection import train_test_split 
from sklearn.linear_model import LinearRegression

def preprocess(path):    
    df = pd.read_csv(r'C:\Users\temporary\Desktop\SUTD\Capstone\Settings'+path)
    data = pd.DataFrame({'user_ID':df['User'].unique(),'1':df.loc[df['Precedence']==1,'score']})
    for i in range(2,67):
        data[str(i)] = list(df.loc[df['Precedence']==i,'score'])
    user = data.iloc[:,1:]

    random.seed(123)
    spl1 = sample(list(range(0,user.shape[0])),int(0.7*user.shape[0]))
    spl2 = sample(list(user.columns),int(0.7*user.shape[1]))
    spl1c = [ele for ele in user.index if ele not in spl1]
    spl2c = [ele for ele in user.columns if ele not in spl2]

    cor = np.empty((300,300))
    for i in spl1c:
        for j in spl1:
            user_ij = user.loc[[i,j],spl2]
            user_ij = user_ij.dropna(axis =1)
            cor[i,j] = np.corrcoef(user_ij)[0,1]
            if np.isnan(cor[i,j])== True:
                cor[i,j] = 0
            cor[j,i] = cor[i,j]
    cor_spl1c = pd.DataFrame(cor).loc[spl1c,spl1]
    return spl1,spl2,spl1c,spl2c,user,cor_spl1c

def predict_NA(user1_ID,user2_ID):
    user_all = user.loc[[user1_ID,user2_ID],:]
    user_reg = user.loc[[user1_ID,user2_ID],spl2]
    user_nona =  user_reg.dropna(axis =1).T

    user1 = pd.DataFrame(user_nona.iloc[:,0]).to_numpy()
    user2 = pd.DataFrame(user_nona.iloc[:,1]).to_numpy()
    
    user_pred = user_all.loc[:,spl2c]
    user_na = user_pred[user_pred.columns[user_pred.iloc[1,:].isna()==False]].T
    user2_na = pd.DataFrame(user_na.iloc[:,1]).to_numpy()
    if len(user1) > 0 and len(user2) >0 and len(user2_na)>0:
        regressor = LinearRegression()  
        regressor.fit(user2, user1)
        score_pred = regressor.predict(user2_na)
        user_na['pred_{}'.format(user2_ID)] = score_pred
    else:
        user_na['pred_{}'.format(user2_ID)] = user2_na
    return user_na

def predict_average(user1_ID):
    predicted_score = pd.DataFrame({"Actual_Score": user.loc[user1_ID,spl2c]})
    correlation = pd.DataFrame({"Actual_Score": user.loc[user1_ID,spl2c]})
    for user2_ID in spl1:
        predcit_user2_ID = predict_NA(user1_ID,user2_ID)["pred_{}".format(user2_ID)]
        #if len(predcit_user2_ID) == 0:
            #predcit_user2_ID.append(np.nan)
        Weighted_Score = abs(cor_spl1c.loc[user1_ID,user2_ID])*predcit_user2_ID
        predicted_score = predicted_score.merge(Weighted_Score,left_index = True,right_index = True,how = "left")
        correlation["pred_{}".format(user2_ID)] = [cor_spl1c.loc[user1_ID,user2_ID]]*len(correlation)
    
    for col in predicted_score.columns:
        for index in correlation.index:
            if np.isnan(predicted_score.loc[index,col])== True:
                correlation.loc[index,col] = np.nan
    corr_column = list(correlation.columns)
    corr_column.remove("Actual_Score")
    corr_sum = abs(correlation[corr_column]).sum(axis = 1)
    
    pred_column = list(predicted_score.columns)
    pred_column.remove("Actual_Score")
    predicted_score["Weighted_Average"]= predicted_score[pred_column].sum(axis = 1)/corr_sum
    predicted_score = predicted_score[["Actual_Score","Weighted_Average"]]
    
    return predicted_score

def calculate_MAE_RMSE():
    SE = 0
    n=0
    AE = 0
    for user1_ID in spl1c:
        predicted_score = predict_average(user1_ID)
        predicted_score = predicted_score.dropna(axis=0)
        SE += sum((predicted_score["Actual_Score"]- predicted_score["Weighted_Average"])**2)
        AE+=sum(abs(predicted_score["Actual_Score"]- predicted_score["Weighted_Average"]))
        n+=len(predicted_score)
        
    MAE = AE/n
    RMSE = np.sqrt(SE/n)

    return MAE,RMSE


# In[16]:


for i in range(18):
    avg_MAE=0
    avg_RMSE=0
    for j in range(0,100):
        path = "\S{}\SimulationDataSetting_{}_{}.csv".format(i+1,i+1,j)
        spl1,spl2,spl1c,spl2c,user,cor_spl1c=preprocess(path)
        MAE,RMSE = calculate_MAE_RMSE()
        avg_MAE+=MAE/100
        avg_RMSE+=RMSE/100
    print({"Setting":i+1,"MAE":avg_MAE,"RMSE":avg_RMSE})

