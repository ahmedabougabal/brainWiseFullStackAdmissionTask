# brainWiseFullStackAdmissionTask

**_backend setup_**
1- pip install -r requirements.txt

2- python manage.py makemigrations departments accounts employees companies

3- python manage.py migrate

4- python manage.py loaddata fixtures/01_users.json                                                                                                                                        ─╯
5- python manage.py loaddata fixtures/02_companies.json
6- python manage.py loaddata fixtures/03_departments.json
7- python manage.py loaddata fixtures/04_employees.json


[//]: # (steps for setting up the POSTGRES database) - pls note that username and password , database name here are fake and not the actual credentials 
-- Create user with proper permissions
CREATE USER usernameOfYourChoice WITH PASSWORD '*******' CREATEDB;

-- Create database with brainWiseAlpha as owner
CREATE DATABASE myBrainWiseTesting_db WITH OWNER = brainWiseAlpha;

-- Connect to the database
\c myBrainWiseTesting_db

-- Grant all privileges
GRANT ALL PRIVILEGES ON DATABASE myBrainWiseTesting_db TO brainWiseAlpha;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO brainWiseAlpha;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO brainWiseAlpha;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO brainWiseAlpha;

-- Grant schema usage
GRANT ALL ON SCHEMA public TO brainWiseAlpha;
