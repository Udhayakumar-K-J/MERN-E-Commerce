from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

review_db = []

@app.route("/api/reviews/predict", methods=["POST"])
def predict_review():
    data = request.get_json()
    fingerprint = data.get("fingerprint")
    email = data.get("email")
    phone = data.get("phone")
    review_text = data.get("reviewText")

    # Check for previous entries with same device
    for review in review_db:
        if review['fingerprint'] == fingerprint and (review['email'] != email or review['phone'] != phone):
            return jsonify({"label": "Fake Review Detected"})

    review_db.append({
        "fingerprint": fingerprint,
        "email": email,
        "phone": phone,
        "reviewText": review_text
    })

    return jsonify({"label": "Genuine Review"})

if __name__ == '__main__':
    app.run(debug=True)
