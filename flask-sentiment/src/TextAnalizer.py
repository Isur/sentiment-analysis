import pickle
from os import path
from textblob import TextBlob
from TextPrepare import predict
import re # regex

modelPath = path.dirname(__file__) + "/data/model.pkl"
c = None
t = None
try:
    with open(modelPath, "rb") as input:
        c = pickle.load(input)
        t = pickle.load(input)
except IOError:
    print("Model does not exists")

class NewAnalizer():
    def __init__(self, text):
        self.text = text
        self.result = None

    def prediction(self):
        self.result = predict(self.text, c, t)[0][0]

class TextAnalizer():
    def __init__(self, text) -> None:
        self.text = text
        self.polarity = None
        self.subjectivity = None
        self.sentiment = None
        self.subject = None

    def clearText(self):
            text = self.text
            text = re.sub('@[A-Za-z0-9]+', '', text) # remove @mentions
            text = re.sub('#', '', text) # remove tags '#'
            text = re.sub('RT[\s]+', '', text) # remove RT
            text = re.sub('https?:\/\/\S+', '', text) # Remove hyperlinks
            self.text = text

    def textPolarity(self):
        self.polarity = TextBlob(self.text).sentiment.polarity

    def textSubjectivity(self):
        self.subjectivity = TextBlob(self.text).sentiment.subjectivity

    def getSentiment(self):
        if self.polarity is None: self.textPolarity()

        if self.polarity > 0: self.sentiment = 1
        elif self.polarity < 0: self.sentiment = -1
        else: self.sentiment = 0

    def getSubject(self):
        if self.subjectivity is None: self.textSubjectivity()

        if self.subjectivity > 0: self.subject = 1
        elif self.subjectivity < 0: self.subject = -1
        else: self.subject = 0

    def analize(self):
        self.textSubjectivity()
        self.textPolarity()
        self.getSentiment()
        self.getSubject()