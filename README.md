# brainWiseFullStackAdmissionTask

> **Backend Setup and PostgreSQL Configuration for BrainWise Task**

---

## ⚙️ Backend Setup and 🐘 PostgreSQL Configuration

To set up the backend and PostgreSQL database for this project, follow these steps:

1. Install dependencies: `pip install -r requirements.txt`  
2. Apply migrations:  
   `python manage.py makemigrations departments accounts employees companies`  
   `python manage.py migrate`  
3. Load initial data:  
   `python manage.py loaddata fixtures/01_users.json`  
   `python manage.py loaddata fixtures/02_companies.json`  
   `python manage.py loaddata fixtures/03_departments.json`  
   `python manage.py loaddata fixtures/04_employees.json`  
4. Create a PostgreSQL user with permissions:  
   `CREATE USER usernameOfYourChoice WITH PASSWORD '*******' CREATEDB;`  
5. Create a database with the user as the owner:  
   `CREATE DATABASE myBrainWiseTesting_db WITH OWNER = brainWiseAlpha;`  
6. Connect to the database: `\c myBrainWiseTesting_db`  
7. Grant all privileges:  
   `GRANT ALL PRIVILEGES ON DATABASE myBrainWiseTesting_db TO brainWiseAlpha;`  
   `GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO brainWiseAlpha;`  
   `GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO brainWiseAlpha;`  
   `GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO brainWiseAlpha;`  
8. Grant schema usage: `GRANT ALL ON SCHEMA public TO brainWiseAlpha;`

---

> **Note**: The username, password, and database name provided in this example are placeholders and not the actual credentials.

