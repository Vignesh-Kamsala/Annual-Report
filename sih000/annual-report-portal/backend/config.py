class Config:
    SECRET_KEY = 'supersecretkey'  # Replace with a secure key
    MYSQL_HOST = 'localhost'
    MYSQL_USER = 'root'
    MYSQL_PASSWORD = '1234567890'
    MYSQL_DB = 'report_portal'
    MYSQL_CURSORCLASS = 'DictCursor'  # So we get dicts from queries
