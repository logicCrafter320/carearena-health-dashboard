# Chronic Care Patient Monitoring System

A full-stack real-time health monitoring project built with React + Vite, Node.js + Express, and MySQL.

## Tech Stack

- Frontend: React, Vite, React Router, Recharts, Lucide React
- Backend: Node.js, Express.js, MySQL2, dotenv, CORS
- Database: MySQL

## Modules

- Login dashboard
- Patient vitals overview
- Add vitals records
- Medical history table
- Alerts and risk status
- Medication adherence
- Doctor notes
- Patient profile

## Setup

1. Create the database:

```sql
SOURCE database/schema.sql;
```

Or open `database/schema.sql` in MySQL Workbench and run it.

2. Backend:

```bash
cd backend
copy .env.example .env
npm install
npm run dev
```

3. Frontend:

```bash
cd frontend
npm install
npm run dev
```

## Login

Any email and password can be used to open the dashboard.

## API

Backend runs on `http://localhost:5000`.

Frontend runs on `http://localhost:5173`.
