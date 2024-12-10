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


![image](https://github.com/user-attachments/assets/a8ead064-f60d-4cdf-bd1e-d778e4fa90ba)


![image](https://github.com/user-attachments/assets/0184ac91-3ec7-4b46-958b-ecbf1b43d923)


![image](https://github.com/user-attachments/assets/bf62d0de-e582-416d-bbf3-5ec2c16fa9ef)


![image](https://github.com/user-attachments/assets/5d56bbd5-e9e5-4e5b-a661-996a126bb807)

**_Error handling as Auth is required_**

![image](https://github.com/user-attachments/assets/ff1f71be-dce8-45c5-8dcd-67e6d190f32f)



