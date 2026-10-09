# FastAPI helps us create APIs/endpoints
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import mysql.connector

from database import get_db_connection


# Creates the FastAPI application
app = FastAPI()


# Allows frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# USER
# =========================================================

class UserCreate(BaseModel):
    name: str
    email: str
    current_year_of_study: int
    goal_in_life: str


@app.post("/users")
def create_user(user: UserCreate):

    connection = get_db_connection()
    cursor = connection.cursor()

    query = """
        INSERT INTO User
        (name, email, current_year_of_study, goal_in_life)
        VALUES (%s, %s, %s, %s)
    """

    values = (
        user.name,
        user.email,
        user.current_year_of_study,
        user.goal_in_life
    )

    try:

        cursor.execute(query, values)

        connection.commit()

        return {
            "message": "User created successfully",
            "user_id": cursor.lastrowid
        }

    except mysql.connector.Error as error:

        connection.rollback()

        raise HTTPException(
            status_code=400,
            detail=str(error)
        )

    finally:

        cursor.close()
        connection.close()


# =========================================================
# SKILLS
# =========================================================

# Represents ONE skill
class SkillItem(BaseModel):
    skill_name: str
    level_of_skill: str


# Represents ALL skills of ONE user
class SkillsCreate(BaseModel):
    user_id: int
    skills: List[SkillItem]


@app.post("/skills")
def create_skills(data: SkillsCreate):

    connection = get_db_connection()
    cursor = connection.cursor()

    query = """
        INSERT INTO Skills
        (user_id, skill_name, level_of_skill)
        VALUES (%s, %s, %s)
    """

    try:

        # Take skills one by one
        for skill in data.skills:

            cursor.execute(
                query,
                (
                    data.user_id,
                    skill.skill_name,
                    skill.level_of_skill
                )
            )

        # Save all inserted skills
        connection.commit()

        return {
            "message": "Skills saved successfully",
            "user_id": data.user_id
        }

    except mysql.connector.Error as error:

        connection.rollback()

        raise HTTPException(
            status_code=400,
            detail=str(error)
        )

    finally:

        cursor.close()
        connection.close()