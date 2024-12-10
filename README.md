# brainWiseFullStackAdmissionTask

> **Backend Setup and PostgreSQL Configuration for BrainWise Task**

---

## ⚙️ Backend Setup and 🐘 PostgreSQL Configuration

> **Note**: The username, password, and database name provided in this example are placeholders and not the actual credentials.
> 
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

# API Testing

![image](https://github.com/user-attachments/assets/246fc533-dfef-4283-9ad5-17ed6fa594a2)


![image](https://github.com/user-attachments/assets/4adb1222-a158-4938-88d1-0c423a8fd4c4)


![image](https://github.com/user-attachments/assets/47a65efc-17f9-4fbe-9552-ab6c4106166a)


![image](https://github.com/user-attachments/assets/2c8d79cf-650c-4590-a671-d651c26fb968)







