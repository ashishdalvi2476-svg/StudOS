# os -> it is the module which helps us to interact with computers env.
# ex. In this case it is helping us to read username , password of the user from .env

# mysql.connector -> this will help us , in conversation of python with mysql.
# from dotenv import load_dotenv -> this helps us to read the data from .env file

import os
import mysql.connector
from dotenv import load_dotenv

load_dotenv()


def get_db_connection():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME")
    )