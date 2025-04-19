# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import mysql.connector
# from dotenv import load_dotenv
# import os

# # Load environment variables
# load_dotenv()

# # Initialize Flask app
# app = Flask(__name__)
# CORS(app)  # Enable CORS

# # Database connection function
# def get_db_connection():
#     return mysql.connector.connect(
#         host=os.getenv("MYSQL_HOST"),
#         user=os.getenv("MYSQL_USER"),
#         password=os.getenv("MYSQL_PASSWORD"),
#         database=os.getenv("MYSQL_DATABASE")
#     )

# # Form submission endpoint
# @app.route('/submit-form', methods=['POST'])
# def submit_form():
#     data = request.get_json()
#     name = data.get('name')
#     email = data.get('email')
#     message = data.get('message')

#     # Store message in database
#     try:
#         conn = get_db_connection()
#         cursor = conn.cursor()
#         cursor.execute(
#             "INSERT INTO contact_messages (name, email, message) VALUES (%s, %s, %s)",
#             (name, email, message)
#         )
#         conn.commit()
#         cursor.close()
#         conn.close()
#         return jsonify({"success": True, "message": "Message saved successfully!"}), 200
#     except Exception as e:
#         print(f"Database error: {str(e)}")  # Log DB errors
#         return jsonify({"success": False, "error": str(e)}), 500

# # Run the Flask app
# if __name__ == '__main__':
#     app.run(debug=True)



from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS (allows other devices to access it)

# Database connection function
def get_db_connection():
    return mysql.connector.connect(
        host=os.getenv("MYSQL_HOST"),
        user=os.getenv("MYSQL_USER"),
        password=os.getenv("MYSQL_PASSWORD"),
        database=os.getenv("MYSQL_DATABASE")
    )

# Form submission endpoint
@app.route('/submit-form', methods=['POST'])
def submit_form():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

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
        print(f"Database error: {str(e)}")
        return jsonify({"success": False, "error": str(e)}), 500

# Run the Flask app on your local network
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)  # 👈 THIS is what lets phones access it