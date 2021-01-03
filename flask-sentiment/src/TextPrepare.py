import re
import string
from nltk import download
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from nltk.tokenize import TweetTokenizer
import numpy as np
from tqdm import tqdm

download('stopwords')

def cleanText(text):
    text = re.sub('@[A-Za-z0-9]+', '', text) # remove @mentions
    text = re.sub('#', '', text) # remove tags '#'
    text = re.sub('RT[\s]+', '', text) # remove RT
    text = re.sub('https?:\/\/\S+', '', text) # Remove hyperlinks
    return text

def tokenizeText(text):
    text = cleanText(text)
    tokenizer = TweetTokenizer()
    tweet_tokenized = tokenizer.tokenize(text)
    stopwords_english = stopwords.words("english")
    tweet_processed = [word for word in tweet_tokenized if word not in stopwords_english and word not in string.punctuation]
    stemmer = PorterStemmer()
    tweet_after_stem = []
    for word in tweet_processed:
        word = stemmer.stem(word)
        tweet_after_stem.append(word)
    return tweet_after_stem

def features_extraction(tweet, freqs_dict):
    word_l = tokenizeText(tweet)
    x = np.zeros((1, 3))
    x[0,0] = 1 
    for word in word_l:
        try:
            x[0,1] += freqs_dict[(word,1)]
        except:
            x[0,1] += 0
        try: 
            x[0,2] += freqs_dict[(word,0.0)]
        except:
            x[0,2] += 0
    assert(x.shape == (1, 3))
    return x

def sigmoid(x): 
    h = 1/(1+np.exp(-x))
    return h


def gradientDescent_algo(x, y, theta, alpha, num_iters):
    m = x.shape[0]
    for i in tqdm(range(0, num_iters), desc="Gradient descent..."):
        z = np.dot(x,theta)
        h = sigmoid(z)
        J = -1/m*(np.dot(y.T,np.log(h))+np.dot((1-y).T,np.log(1-h)))
        theta = theta-(alpha/m)*np.dot(x.T,h-y)
    J = float(J)
    return J, theta

def predict(tweet, freqs_dict, theta):
    x = features_extraction(tweet,freqs_dict)
    y_pred = sigmoid(np.dot(x,theta))
    return y_pred

def test_accuracy(test_x, test_y, freqs_dict, theta):
    y_hat = []
    for tweet in tqdm(test_x, desc="Predictions..."):
        y_pred = predict(tweet, freqs_dict, theta)
        if y_pred[0][0] > 0.5:
            y_hat.append(1)
        else:
            y_hat.append(0)
    m=len(y_hat)
    y_hat=np.array(y_hat)
    y_hat=y_hat.reshape(m)
    test_y=test_y.reshape(m)
    
    c=y_hat==test_y
    j=0
    for i in tqdm(c, desc="Accuracy counting..."):
        if i==True:
            j=j+1
    accuracy = j/m
    return accuracy

def bag_of_words(text, bag, sentiment):
    for word in text:
        if (word, sentiment) in bag:
            bag[(word ,sentiment)] = bag[(word, sentiment)] + 1
        else:
            bag[(word, sentiment)] = 1

def stringToList(str):
    str = str[1:-1]
    l = str.split(", ")
    l = [s[1:-1] for s in l]
    return l