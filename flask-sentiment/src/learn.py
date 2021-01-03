from os import path
from TextPrepare import features_extraction, gradientDescent_algo, test_accuracy, bag_of_words, stringToList
import numpy as np
import pandas as pd
from tqdm import tqdm
from sklearn.model_selection import train_test_split
import pickle

tokenizedPath = path.dirname(__file__) + "/data/tokenized.csv"
modelPath = path.dirname(__file__) + "/data/model.pkl"
dataset = pd.read_csv(filepath_or_buffer=tokenizedPath, delimiter=",", encoding="ISO-8859-1",header=0)

positive_data = dataset[(dataset.sent == 1)]
pData=[]
pTokenized=[]
for tw in positive_data['text']:
    pData.append(tw)
for tw in positive_data['token']:
    pTokenized.append(stringToList(tw))

negative_data = dataset[(dataset.sent == -1)]
nData=[]
nTokenized=[]
for tw in negative_data['text']:
    nData.append(tw)
for tw in negative_data['token']:
    nTokenized.append(stringToList(tw))

limit = min(len(pData), len(nData))
# limit = 10000
pData = pData[0:limit]
nData = nData[0:limit]
pTokenized = pTokenized[0:limit]
nTokenized = nTokenized[0:limit]

positive_train, positive_test = train_test_split(pData, test_size=0.2)
negative_train, negative_test = train_test_split(nData, test_size=0.2)


train_x = positive_train + negative_train
test_x = positive_test + negative_test

train_y = np.append(np.ones((len(positive_train), 1)), np.zeros((len(negative_train), 1)), axis=0)
test_y = np.append(np.ones((len(positive_test), 1)), np.zeros((len(negative_test), 1)), axis=0)

BoW = {}
for tweet in tqdm(pTokenized, desc="Positive bag of words"):
    bag_of_words(tweet, BoW, 1)

for tweet in tqdm(nTokenized, desc="Negative bag of words"):
    bag_of_words(tweet, BoW, 0)

X = np.zeros((len(train_x), 3))
for i in tqdm (range(len(train_x)), desc="Feature extraction"):
    X[i, :]= features_extraction(train_x[i], BoW)
Y = train_y

J, theta = gradientDescent_algo(X, Y, np.zeros((3, 1)), 1e-9, 15000)

accuracy = test_accuracy(test_x, test_y, BoW, theta)

print(accuracy)

with open(modelPath, "wb") as output:
    pickle.dump(BoW, output, pickle.HIGHEST_PROTOCOL)
    pickle.dump(theta, output, pickle.HIGHEST_PROTOCOL)
