from os import path
from textblob import TextBlob
import pandas as pd
import re # regular expressions

source = path.dirname(__file__) + "/../data/data.csv"
dataset = pd.read_csv(filepath_or_buffer=source, delimiter=",", encoding="ISO-8859-1",header=None)
dataset.columns = ['target', 'ids', 'date', 'flag', 'user', 'text']