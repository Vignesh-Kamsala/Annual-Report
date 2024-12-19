from flask import request, jsonify
from app import mysql

def setup_routes(app):

    @app.route('/api/homepage', methods=['GET'])
    def get_homepage_data():
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM homepage")
        data = cur.fetchall()
        return jsonify(data)

    @app.route('/api/login', methods=['POST'])
    def login():
        credentials = request.json
        # Handle login logic here
        return jsonify({'token': 'generated_token', 'role': 'Admin'})  # Mock response
