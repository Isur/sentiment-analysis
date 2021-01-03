from os import path
from TextAnalizer import TextAnalizer
from TextPrepare import tokenizeText
import pandas as pd
from tqdm import tqdm
tqdm.pandas()

def getSent(text):
    t = TextAnalizer(text)
    t.analize()
    return t.sentiment

source = path.dirname(__file__) + "/data/data.csv"
tokenizedPath = path.dirname(__file__) + "/data/tokenized.csv"

dataset = pd.read_csv(filepath_or_buffer=source, delimiter=",", encoding="ISO-8859-1",header=None)
dataset.columns = ['target', 'ids', 'date', 'flag', 'user', 'text']
dataset.drop(['ids', 'date', 'flag', 'user'], axis=1, inplace=True)

dataset['token'] = dataset.progress_apply(lambda row: tokenizeText(row['text']), axis=1)
dataset['sent'] = dataset.progress_apply(lambda row: getSent(row['text']), axis=1)
dataset.to_csv(tokenizedPath, index=False)
