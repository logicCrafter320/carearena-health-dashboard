# CareArena - Chronic Care Management System

CareArena is a full-stack chronic care patient monitoring project designed for real-time healthcare tracking. The system helps patients and doctors monitor vitals, medication adherence, alerts, health history, and doctor notes from one dashboard.

The frontend is deployed on Vercel and can be opened directly through the live website link. The backend and MySQL database are included in the project for full-stack demonstration and local development.

## Project Objective

The main objective of this project is to build a digital healthcare dashboard for chronic disease management. It supports continuous patient monitoring by recording important health values such as blood pressure, glucose, heart rate, and temperature. Based on these readings, the system can show warning or critical alerts.

## Website Features

- CareArena landing page with healthcare-focused UI
- Simple login page where any email and password can open the dashboard
- Patient dashboard with latest vital readings
- Glucose trend chart and blood pressure/heart rate chart
- Vitals entry form for adding new readings
- Health history table with previous records
- Clinical alerts grouped by severity
- Medication schedule with taken/pending status
- Doctor notes module
- Patient profile module
- Responsive UI built for desktop and smaller screens

## Tech Stack

- Frontend: React, Vite, React Router, Recharts, Lucide React
- Backend: Node.js, Express.js, MySQL2, dotenv, CORS
- Database: MySQL
- Deployment: Vercel for frontend
- Version Control: GitHub

## Folder Structure

```text
carearena-health-dashboard/
+-- frontend/        React + Vite website
+-- backend/         Node.js + Express API
+-- database/        MySQL schema and sample data
+-- tools/           Local development utilities
+-- README.md        Project documentation
```

## Project Modules

### 1. Authentication

The login page allows users to enter any email and password. This makes the project easy to demonstrate without requiring fixed credentials.

### 2. Overview Dashboard

Shows the latest patient health values:

- Blood pressure
- Glucose
- Heart rate
- Temperature
- Medication adherence
- Recent alerts
- Health trend charts

### 3. Log Vitals

Allows the user to add new vital readings. New readings update the system data and can create alerts based on threshold values.

### 4. Health History

Displays previous patient readings in table format with blood pressure, glucose, heart rate, and temperature.

### 5. Alerts

Shows clinical alerts such as warning and critical messages when health values cross safe limits.

### 6. Medications

Displays the medication schedule and allows users to update whether a medicine is taken or pending.

### 7. Doctor Notes

Allows doctors to add notes with severity levels such as routine, follow-up, and critical.

### 8. Profile

Shows patient details, condition, doctor name, contact information, and emergency contact.

## How to Run Locally

### Prerequisites

Install the following:

- Node.js
- MySQL
- VS Code

### 1. Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

### 2. Create the MySQL Database

Open MySQL Workbench and run:

```sql
SOURCE database/schema.sql;
```

Or manually open `database/schema.sql` and execute the SQL script.

### 3. Run the Backend

```bash
cd backend
copy .env.example .env
npm install
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

## Login Details

For demonstration, any email and password can be used.

Example:

```text
Email: student@example.com
Password: 123456
```

## Deployment

The frontend is deployed using Vercel from the `frontend` folder.

Vercel settings:

```text
Root Directory: frontend
Framework: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

Since the deployed frontend uses built-in demo data, users can access the website directly from the Vercel link without running VS Code or MySQL locally.

## Notes for Evaluation

- The project contains both frontend and backend code.
- The deployed version is configured for easy demonstration using demo data.
- The backend and MySQL database are included to show full-stack implementation.
- The UI is designed as a healthcare product named CareArena.
- The system demonstrates real-time chronic care monitoring concepts through vitals, alerts, medication, history, notes, and profile modules.
