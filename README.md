<div align="center">

# CareArena

### Chronic Disease Monitoring Dashboard

A healthcare dashboard for monitoring chronic conditions such as diabetes and hypertension through vitals tracking, trend charts, threshold alerts, medication adherence, doctor notes, and patient history.

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=111111)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=ffffff)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=ffffff)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/Database-MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=ffffff)](https://www.mysql.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=ffffff)](https://vercel.com/)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Project Objective](#project-objective)
- [Current Implementation](#current-implementation)
- [Planned Modules From Abstract](#planned-modules-from-abstract)
- [Team Module Mapping](#team-module-mapping)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Local Setup](#local-setup)
- [Database Setup](#database-setup)
- [Login Details](#login-details)
- [Vercel Deployment](#vercel-deployment)
- [Evaluation Notes](#evaluation-notes)

---

## Overview

CareArena is a chronic disease monitoring dashboard designed to help patients and healthcare providers track long-term health conditions. The project focuses on diabetes and hypertension monitoring by recording vital health parameters such as blood sugar, blood pressure, heart rate, and body temperature.

The dashboard visualizes patient readings through interactive charts, detects abnormal values using threshold-based alerts, and organizes patient care information through medication tracking, doctor notes, health history, and profile management.

This repository contains:

| Part | Description |
|---|---|
| `frontend` | React + Vite web application |
| `backend` | Node.js + Express REST API |
| `database` | MySQL schema and sample data |

The deployed frontend uses built-in demo fallback data, so the website can be demonstrated directly from Vercel without requiring local MySQL setup.

---

## Project Objective

The objective of CareArena is to provide a digital healthcare interface that:

- Tracks chronic disease vitals such as glucose, blood pressure, heart rate, and temperature
- Visualizes patient health trends using charts
- Generates warning or critical alerts when vitals cross safe limits
- Helps monitor medication schedules and adherence
- Stores doctor observations and patient history
- Provides a responsive and user-friendly healthcare dashboard

---

## Current Implementation

The following modules are implemented in the current website:

| Module | Status | Description |
|---|---|---|
| Login Access | Implemented | Any email and password can open the dashboard for demo access |
| Landing Page | Implemented | CareArena healthcare-themed landing page |
| Overview Dashboard | Implemented | Shows latest vitals, charts, alerts, and adherence |
| Vitals Logging | Implemented | Form to add blood pressure, glucose, heart rate, and temperature |
| Charts Visualization | Implemented | Glucose trend and BP/heart rate charts using Recharts |
| Alerts | Implemented | Warning and critical alert display |
| Medication Tracker | Implemented | Medicine schedule with taken/pending status |
| Doctor Notes | Implemented | Doctor observation and notes module |
| Patient History | Implemented | Table of previous vital records |
| Profile | Implemented | Patient information and care details |
| Vercel Deployment | Implemented | Frontend deployed from the `frontend` folder |

---

## Planned Modules From Abstract

The official abstract includes the following planned modules. These are documented as planned features and are not fully implemented in the current deployed version.

| Planned Module | Purpose |
|---|---|
| Register Page | Complete login/register authentication flow |
| Export PDF Module | Downloadable patient health reports using jsPDF |
| Admin Panel | Manage users, doctors, and system-level activity |
| History Filters | Filter records by date range and vital type |
| Context API / Redux | Scalable global state management |
| Axios API Layer | REST API integration with loading and error states |
| Tailwind CSS / Bootstrap | Optional styling framework from abstract |
| Postman Testing | API testing collection |
| Production Backend Deployment | Hosted backend connected to the deployed frontend |

---

## Team Module Mapping

| Module Name | Assigned Roll Number(s) |
|---|---|
| User Authentication (Login/Register) | 2520030252 |
| Vitals Logging Module | 2520030252 |
| Dashboard & Charts Visualization | 2520030252 |
| Threshold Alerts & Notifications System | 2520030252 |
| UI/UX Design & Routing | 2520030252 |
| Medication Tracker | 2520030215 |
| Doctor Notes & Reports | 2520030215 |
| Export PDF Module | 2520030215 |
| Patient History Module | 2520030215 |
| Testing & Deployment | 2520030215 |
| Profile Management | 2520080061 |
| Admin Panel | 2520080061 |
| API Integration Layer | 2520080061 |
| State Management (Context/Redux) | 2520080061 |

---

## Tech Stack

### Current Implementation

| Layer | Technologies |
|---|---|
| Frontend | React.js, Vite, React Router, Recharts, Lucide React, CSS3 |
| Backend | Node.js, Express.js, MySQL2, CORS, dotenv |
| Database | MySQL schema with sample healthcare data |
| Demo Data | Frontend fallback data for Vercel demonstration |
| Deployment | Vercel frontend deployment |
| Version Control | GitHub |

### Abstract / Planned Tools

| Category | Tools |
|---|---|
| Frontend | HTML5, CSS3, JavaScript (ES6+), React.js |
| Styling | Tailwind CSS or Bootstrap |
| Backend | Node.js, Express.js |
| Database | MySQL or LocalStorage |
| API Integration | Axios |
| Charts | Recharts or Chart.js |
| PDF Reports | jsPDF |
| State Management | Context API or Redux |
| API Testing | Postman |
| Development | VS Code, Git, Chrome DevTools |
| Deployment | Netlify or Vercel |

---

## Folder Structure

```text
carearena-health-dashboard/
|-- frontend/        React + Vite website
|-- backend/         Node.js + Express API
|-- database/        MySQL schema and sample data
|-- tools/           Local development utilities
|-- README.md        Project documentation
```

---

## Local Setup

### Prerequisites

Install the following software:

- Node.js
- MySQL
- VS Code

### Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

### Run the Backend

```bash
cd backend
copy .env.example .env
npm install
npm run dev
```

Backend URL:

```text
http://localhost:5000
```

---

## Database Setup

Open MySQL Workbench and run:

```sql
SOURCE database/schema.sql;
```

Or open `database/schema.sql` manually in MySQL Workbench and execute the script.

The database includes sample patient data, vitals, alerts, medications, and doctor notes for demonstration.

---

## Login Details

For demonstration, any email and password can be used.

```text
Email: student@example.com
Password: 123456
```

---

## Vercel Deployment

The frontend is deployed from the `frontend` folder.

Use these settings in Vercel:

| Setting | Value |
|---|---|
| Root Directory | `frontend` |
| Framework | `Vite` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

The deployed frontend uses built-in demo data. This allows professors, teammates, and evaluators to access the website directly from the Vercel link without running the backend locally.

---

## Evaluation Notes

- The README is aligned with the official project abstract.
- Implemented modules and planned modules are separated clearly.
- The deployed version demonstrates the main chronic care monitoring workflow.
- Backend and MySQL files are included to show full-stack implementation.
- PDF export, Admin Panel, Register, Axios, Tailwind/Bootstrap, and Context/Redux are documented as planned or abstract modules, not as completed features.
- The project demonstrates routing, component-based UI, charts, state updates, responsive design, and deployment.
