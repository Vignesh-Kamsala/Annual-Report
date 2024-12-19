from app import mysql

def get_homepage_data():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM homepage")
    data = cur.fetchall()
    cur.close()
    return data
