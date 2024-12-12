# brainWiseFullStackAdmissionTask


[![Project Status](https://img.shields.io/badge/status-Under%20Construction-yellow)](https://github.com/yourusername/mernStackMilestoneProject_ITI)  [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)  [![Deadline](https://img.shields.io/badge/deadline-12/12/2024-red)](https://github.com/yourusername/mernStackMilestoneProject_ITI)




## 🚧 Frontend Development in Progress 🚧
##  Authentication & Authorization
✅ Login System Implementation
  - ✅ Admin Login Page
  - ✅ Employee Login Page
  - ✅ JWT Token Management
  - ✅ Authentication Context
  - ✅ Protected Routes
  - ✅ Role-Based Access Control

## Dashboard & Admin Features
✅ Admin Dashboard Structure
  - ✅ Material-UI Integration
  - ✅ Responsive Layout
  - ✅ Navigation Components
  - ✅ Error Handling
  - ✅ Loading States

✅ Employee Management (still fixing frontend bugs with this context)
  - ✅ Employee List View
  - ✅ CRUD Operations
    - ✅ Create Employee
    - ✅ Read Employee Details
    - ✅ Update Employee Information
    - ✅ Delete Employee
  - ✅ Form Validation
  - ✅ Success/Error Notifications

##  Employee Features (fixing bugs)
✅ Employee Profile
  - ✅ Profile View
  - ✅ Personal Information Display
  - ✅ Employment Details

## 🛠 Technical Implementation
✅ Project Structure
  - ✅ Component Organization
  - ✅ Custom Hooks
  - ✅ Context Management
  - ✅ Utility Functions

✅ API Integration (done and well-documented)
  - ✅ Axios Configuration
  - ✅ API Services
  - ✅ Error Handling
  - ✅ Response Interceptors

✅ Routing
  - ✅ React Router Setup
  - ✅ Protected Routes
  - ✅ Role-Based Navigation
  - ✅ Route Guards

## UI/UX Components
✅ Material-UI Implementation (react 19 had conflicts with this package so I used React 18.3)
  - ✅ Theme Configuration
  - ✅ Responsive Design
  - ✅ Form Components
  - ✅ Data Tables

## 🔄 State Management
✅ Context API Implementation
  - ✅ Authentication State
  - ✅ User Context
  - ✅ Loading States
  - ✅ Error States

## Infrastructure
✅ Development Environment
  - ✅ TypeScript Configuration
  - ✅ ESLint Setup
  - ✅ Project Structure
  - ✅ Code Organization


---

## Let's Get You Started to Run This Project Locally

To clone this repository and set it up locally, use the following command:

```bash
git clone git@github.com:ahmedabougabal/brainWiseFullStackAdmissionTask.git

```
---

> **Backend Setup and PostgreSQL Configuration for BrainWise Task**

---

## ⚙️ Backend Setup and 🐘 PostgreSQL Configuration

> **Note**: The username, password, and database name provided in this example are placeholders and not the actual credentials.
> 
To set up the backend and PostgreSQL database for this project, follow these steps:

1. Install dependencies: `pip install -r requirements.txt`
2. **__(note : ensure you are in the directory 'backend' before executing the following commands)__**.
3. Apply migrations:
   `python manage.py makemigrations departments accounts employees companies`  
   `python manage.py migrate`  
4. Load initial data:  
   `python manage.py loaddata fixtures/01_users.json`  
   `python manage.py loaddata fixtures/02_companies.json`  
   `python manage.py loaddata fixtures/03_departments.json`  
   `python manage.py loaddata fixtures/04_employees.json`
5. On Bash/Zsh CLI login to psql db as a root : *__sudo -u postgres psql__*
6. Create a PostgreSQL user with permissions:  
   `CREATE USER usernameOfYourChoice WITH PASSWORD '*******' CREATEDB;`  
7. Create a database with the user as the owner:  
   `CREATE DATABASE myBrainWiseTesting_db WITH OWNER = brainWiseAlpha;`  
8. Connect to the database: `\c myBrainWiseTesting_db`  
9. Grant all privileges:  
   `GRANT ALL PRIVILEGES ON DATABASE myBrainWiseTesting_db TO brainWiseAlpha;`  
   `GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO brainWiseAlpha;`  
   `GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO brainWiseAlpha;`  
   `GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO brainWiseAlpha;`  
10. Grant schema usage: `GRANT ALL ON SCHEMA public TO brainWiseAlpha;`

---

# [My API Testing ==> **_Click me_** to headover to my **POSTMAN** public workspace and view all my endpoints listed below 👨‍💻 ](https://www.postman.com/golden-noobie/brainwise-admission-api-testing-by-ahmed-abou-gabal/collection/gyjljwr/brainwise-admission-api-testing?action=share&creator=38508690)

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

![image](https://github.com/user-attachments/assets/9043e9d6-312f-4f52-9e99-bb25b8ab85f4)


![image](https://github.com/user-attachments/assets/2bab3969-af02-4e35-b5d7-232f52685503)


![image](https://github.com/user-attachments/assets/8462e2e3-cf77-4064-959e-10443dcd1948)


![image](https://github.com/user-attachments/assets/ab1dbb6c-d765-4043-8d33-a3d35f694f7e)


![image](https://github.com/user-attachments/assets/f9b96457-d19c-4c5d-bd44-5c2027c50c28)


![image](https://github.com/user-attachments/assets/1077cdf0-152e-4308-977e-7e67cab62196)


