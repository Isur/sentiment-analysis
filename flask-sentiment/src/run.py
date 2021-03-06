from flask import Flask, request, abort, jsonify
from TextAnalizer import NewAnalizer

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<h1> Flask app :) </h1> <h3> Sentiment analisys </h3>"

@app.route("/sentiment", methods=['POST'])
def sentiment():
    if request.json['text'] is None: abort(400, 'Bad request')
    n = NewAnalizer(request.json['text'])
    n.prediction()
    response = jsonify({
        'text': n.text,
        'sentiment': n.result
    })
    return response

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)