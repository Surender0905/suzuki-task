# CRUD Application - Microservice System with NextJS Frontend

## Problem Statement

This project involves designing a microservice system for a simple CRUD application with user management functionality. The application allows users to:

-   View a list of users
-   View detailed information of a selected user
-   Add and edit user data

---

## Installation

### Step 1: Clone the Repository

Start by cloning the repository from GitHub. Use the following command to clone the repository to your local machine:

```bash
git clone <repository_url>
cd <project_directory>
```

1. **Frontend Service (NextJS)**:

    - cd frontend

    - Install dependencies: `npm install`
    - To start the frontend service, run `npm run dev`
    - To build the NextJS application, run `npm run build`

    - Create a NextJS application to:
        - Display a list of users
        - Show a detailed view of a selected user
        - Provide forms for adding and editing user details

2. **User Entity**:
   The user data consists of the following fields:

    ```json
    {
        "user": "Harry",
        "interest": ["Comics", "Sports"],
        "age": 22,
        "mobile": 4234243224,
        "email": "harry@potter.com"
    }
    ```

3. **Backend Service (NodeJS)**:

    - cd backend
    - Install dependencies: `npm install`
    - To start the backend service, run `npm start` in the backend directory

4. **Database (MongoDB)**:

    - Create a MongoDB database to store user data
    - Configure the backend service to connect to the MongoDB database

---
