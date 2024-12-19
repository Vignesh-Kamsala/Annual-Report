from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
import bcrypt
import jwt
import datetime
import json

app = Flask(__name__)
app.config.from_object('config.Config')

mysql = MySQL(app)
CORS(app)

# JWT Secret Key
SECRET_KEY = app.config['SECRET_KEY']

# Helper function to create JWT token
def create_token(email, role):
    payload = {
        'email': email,
        'role': role,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)  # Token valid for 24 hours
    }
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')

# User Signup Route
@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    email = data['email']
    password = data['password']
    role = data['role']

    # Hash the password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    try:
        # Insert the user into the database
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO users (email, password, role) VALUES (%s, %s, %s)", 
                    (email, hashed_password, role))
        mysql.connection.commit()
        cur.close()
        return jsonify({'message': 'Signup successful!'}), 201
    except Exception as e:
        return jsonify({'message': str(e)}), 400

# User Login Route
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password']
    role = data['role']

    # Check if user exists in the database
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM users WHERE email = %s", (email,))
    user = cur.fetchone()
    cur.close()

    if user and bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        # Check if the role matches
        if user['role'] != role:
            return jsonify({'message': 'Role mismatch!'}), 401

        # Generate a token
        token = create_token(user['email'], user['role'])
        return jsonify({'token': token, 'role': user['role']}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

# Fetch Homepage Data (GET Request)
@app.route('/api/homepage', methods=['GET'])
def get_homepage():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM homepage WHERE id = 1")  # Assuming there's only one homepage row
        data = cur.fetchone()
        cur.close()
        
        if data:
            # Log the fetched data
            print(f"Fetched data from the database: {data}")
            
            try:
                homepage_data = {
                    'bannerText': {
                        'title': data[1],
                        'description': data[2]
                    },
                    'leadership': json.loads(data[3]),  # Convert JSON string to Python list
                    'majorChanges': json.loads(data[4])  # Convert JSON string to Python list
                }
                return jsonify(homepage_data), 200
            except json.JSONDecodeError as e:
                return jsonify({'message': f'Error parsing JSON: {str(e)}'}), 500
        else:
            return jsonify({'message': 'No homepage data found'}), 404
    except Exception as e:
        print(f"Error fetching homepage data: {str(e)}")
        return jsonify({'message': 'Error fetching homepage data'}), 500

# Update Homepage Data (PUT Request - Admin only)
@app.route('/api/admin/homepage', methods=['PUT'])
def update_homepage():
    data = request.json
    banner_text = data['bannerText']
    leadership = json.dumps(data['leadership'])  # Convert Python list to JSON string
    major_changes = json.dumps(data['majorChanges'])  # Convert Python list to JSON string
    
    try:
        cur = mysql.connection.cursor()
        cur.execute("""
            UPDATE homepage 
            SET banner_title = %s, banner_description = %s, leadership = %s, major_changes = %s
            WHERE id = 1
        """, (banner_text['title'], banner_text['description'], leadership, major_changes))
        
        mysql.connection.commit()
        cur.close()
        
        return jsonify({'message': 'Homepage data updated successfully'}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
