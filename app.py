from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from dotenv import load_dotenv
import os
import requests  # For verifying reCAPTCHA

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS

# Load reCAPTCHA secret key from .env
RECAPTCHA_SECRET_KEY = os.getenv("RECAPTCHA_SECRET_KEY")

# Database connection function
def get_db_connection():
    return mysql.connector.connect(
        host=os.getenv("MYSQL_HOST"),
        user=os.getenv("MYSQL_USER"),
        password=os.getenv("MYSQL_PASSWORD"),
        database=os.getenv("MYSQL_DATABASE")
    )

# reCAPTCHA verification function
def verify_recaptcha(token):
    url = 'https://www.google.com/recaptcha/api/siteverify'
    data = {
        'secret': RECAPTCHA_SECRET_KEY,
        'response': token
    }
    response = requests.post(url, data=data)
    return response.json()

# Form submission endpoint
@app.route('/submit-form', methods=['POST'])
def submit_form():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')
    recaptcha_token = data.get('recaptchaToken')  # Received from frontend

    # Verify reCAPTCHA
    recaptcha_result = verify_recaptcha(recaptcha_token)
    if not recaptcha_result.get('success') or recaptcha_result.get('score', 0) < 0.5:
        return jsonify({"success": False, "message": "Failed reCAPTCHA verification"}), 400

    # Store message in database
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO contact_messages (name, email, message) VALUES (%s, %s, %s)",
            (name, email, message)
        )
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"success": True, "message": "Message saved successfully!"}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)