from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

feedback_list = []  

@app.route('/submit_feedback', methods=['POST'])
def submit_feedback():
    data = request.json 

    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    if not name or not email or not message:
        return jsonify({"error": "All fields are required"}), 400

    new_feedback = {"name": name, "email": email, "message": message}
    feedback_list.append(new_feedback) 
    return jsonify({"message": "Feedback submitted successfully!", "feedback": new_feedback}), 201


@app.route('/get_feedback', methods=['GET'])
def get_feedback():
    return jsonify(feedback_list)  

if __name__ == '__main__':
    app.run(debug=True)
