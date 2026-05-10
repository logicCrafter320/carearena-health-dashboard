CareArena - Chronic Disease Monitoring Dashboard
CareArena is a chronic disease monitoring dashboard designed to help patients and healthcare providers track long-term conditions such as diabetes and hypertension. The project focuses on recording vital health parameters, visualizing trends, detecting abnormal values, and organizing patient care information in one dashboard.

This repository contains a React + Vite frontend, a Node.js + Express backend, and a MySQL database schema. The deployed frontend uses built-in demo data so the website can be demonstrated easily through Vercel without requiring local MySQL setup.

Abstract / Project Overview
The project develops a Chronic Disease Monitoring Dashboard for patients and healthcare providers. Users can log important health readings such as blood sugar, blood pressure, heart rate, and body temperature. These readings are displayed through interactive charts to help identify health patterns over time.

The system also supports threshold-based alerts for abnormal values, medication tracking, doctor notes, patient history, and profile management. The goal is to improve patient engagement, support early detection of health risks, and help doctors make informed decisions using organized patient data.

Project Objective
The objective of CareArena is to provide a digital healthcare interface that:

Tracks chronic disease vitals such as glucose, blood pressure, heart rate, and temperature
Visualizes patient health trends using charts
Generates warning or critical alerts when vitals cross safe limits
Helps monitor medication schedules and adherence
Stores doctor observations and patient history
Provides a responsive, user-friendly healthcare dashboard
Live Deployment
The frontend is deployed on Vercel from the frontend folder. The deployed version uses demo fallback data, so it can be opened directly from the live URL without running VS Code, Node.js, Express, or MySQL locally.

Current Implemented Modules
The following modules are currently implemented in the website:

Login access with any email and password for easy demonstration
CareArena landing page with healthcare-focused UI
Overview dashboard with latest patient vitals
Vitals logging form
Glucose trend chart using Recharts
Blood pressure and heart rate chart
Threshold-based alert display
Medication tracker with taken/pending status
Doctor notes module
Patient health history table
Patient profile page
Responsive frontend layout
Vercel frontend deployment
Planned / Abstract Modules
The following modules are included in the official abstract and project plan, but are not fully implemented in the current deployed version:

Register page with complete authentication flow
Exportable PDF health reports using jsPDF
Admin panel for managing users, doctors, and system-level activity
Date range and vital type filters for patient history
Context API or Redux for complete global state management
Axios-based API integration layer
Tailwind CSS or Bootstrap styling option
Postman API testing collection
Full production backend deployment
Team Module Mapping
Module Name	Assigned Roll Number(s)
User Authentication (Login/Register)	2520030252
Vitals Logging Module	2520030252
Dashboard & Charts Visualization	2520030252
Threshold Alerts & Notifications System	2520030252
UI/UX Design & Routing	2520030252
Medication Tracker	2520030215
Doctor Notes & Reports	2520030215
Export PDF Module	2520030215
Patient History Module	2520030215
Testing & Deployment	2520030215
Profile Management	2520080061
Admin Panel	2520080061
API Integration Layer	2520080061
State Management (Context/Redux)	2520080061
Tech Stack
Current Implementation
Frontend: React.js, Vite, React Router, Recharts, Lucide React, CSS3
Backend: Node.js, Express.js, MySQL2, CORS, dotenv
Database: MySQL schema with sample data
Demo Data: Frontend fallback data for Vercel demonstration
Deployment: Vercel frontend deployment
Version Control: GitHub
Abstract / Planned Tools
Frontend: HTML5, CSS3, JavaScript (ES6+), React.js
Styling: Tailwind CSS or Bootstrap
Backend: Node.js, Express.js
Database: MySQL or LocalStorage
API Integration: Axios
Charts: Recharts or Chart.js
PDF Reports: jsPDF
State Management: Context API or Redux
API Testing: Postman
Development Tools: VS Code, Git, Chrome DevTools
Deployment: Netlify or Vercel
Folder Structure
carearena-health-dashboard/
+-- frontend/        React + Vite website
+-- backend/         Node.js + Express API
+-- database/        MySQL schema and sample data
+-- tools/           Local development utilities
+-- README.md        Project documentation
How to Run Locally
Prerequisites
Install the following software:

Node.js
MySQL
VS Code
1. Run the Frontend
cd frontend
npm install
npm run dev
Frontend runs on:

http://localhost:5173
2. Run the Backend
cd backend
copy .env.example .env
npm install
npm run dev
Backend runs on:

http://localhost:5000
Database Setup
Open MySQL Workbench and run the SQL file:

SOURCE database/schema.sql;
Alternatively, open database/schema.sql manually in MySQL Workbench and execute the script.

The database includes sample patient data, vitals, alerts, medications, and doctor notes for demonstration.

Login Details
For demonstration, any email and password can be used to open the dashboard.

Example:

Email: student@example.com
Password: 123456
Vercel Deployment Settings
The frontend is deployed from the frontend folder.

Use these settings in Vercel:

Root Directory: frontend
Framework: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
The deployed frontend uses built-in demo data. This allows professors, teammates, and evaluators to access the website directly from the Vercel link without running the backend locally.
