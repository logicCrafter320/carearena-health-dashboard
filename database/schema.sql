DROP DATABASE IF EXISTS chronic_care_db;
CREATE DATABASE chronic_care_db;
USE chronic_care_db;

CREATE TABLE patients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  age INT NOT NULL,
  gender VARCHAR(20) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address VARCHAR(255) NOT NULL,
  condition_name VARCHAR(100) NOT NULL,
  emergency_contact VARCHAR(100) NOT NULL,
  doctor_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE vitals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT NOT NULL,
  systolic INT NOT NULL,
  diastolic INT NOT NULL,
  glucose INT NOT NULL,
  heart_rate INT NOT NULL,
  temperature DECIMAL(4,1) NOT NULL,
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);

CREATE TABLE alerts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT NOT NULL,
  severity ENUM('critical', 'warning', 'stable') NOT NULL,
  title VARCHAR(120) NOT NULL,
  message VARCHAR(255) NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);

CREATE TABLE medications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT NOT NULL,
  medicine_name VARCHAR(100) NOT NULL,
  dosage VARCHAR(60) NOT NULL,
  medication_time VARCHAR(30) NOT NULL,
  is_taken BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);

CREATE TABLE doctor_notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT NOT NULL,
  doctor_name VARCHAR(100) NOT NULL,
  severity ENUM('critical', 'follow-up', 'routine') NOT NULL,
  note TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);

INSERT INTO patients (name, email, age, gender, phone, address, condition_name, emergency_contact, doctor_name)
VALUES
('Jothiganesh Guntu', 'patient@demo.com', 42, 'Male', '+91 98765 43210', 'Hyderabad, Telangana', 'Type 2 Diabetes and Hypertension', 'Anitha Guntu - +91 90000 11111', 'Dr. Priya Reddy');

INSERT INTO vitals (patient_id, systolic, diastolic, glucose, heart_rate, temperature, recorded_at)
VALUES
(1, 126, 82, 132, 78, 98.3, NOW() - INTERVAL 6 DAY),
(1, 130, 84, 146, 81, 98.5, NOW() - INTERVAL 5 DAY),
(1, 138, 88, 158, 86, 98.6, NOW() - INTERVAL 4 DAY),
(1, 142, 92, 181, 92, 99.0, NOW() - INTERVAL 3 DAY),
(1, 136, 86, 152, 80, 98.4, NOW() - INTERVAL 2 DAY),
(1, 128, 83, 139, 76, 98.2, NOW() - INTERVAL 1 DAY),
(1, 134, 86, 144, 79, 98.5, NOW());

INSERT INTO alerts (patient_id, severity, title, message, created_at)
VALUES
(1, 'critical', 'High glucose detected', 'Glucose crossed 180 mg/dL. Doctor review recommended.', NOW() - INTERVAL 3 DAY),
(1, 'warning', 'Blood pressure elevated', 'BP reached 142/92 mmHg. Continue monitoring.', NOW() - INTERVAL 3 DAY),
(1, 'stable', 'Vitals improved', 'Latest readings are back near target range.', NOW() - INTERVAL 1 DAY);

INSERT INTO medications (patient_id, medicine_name, dosage, medication_time, is_taken)
VALUES
(1, 'Metformin', '500 mg', '08:00 AM', TRUE),
(1, 'Amlodipine', '5 mg', '09:00 AM', TRUE),
(1, 'Atorvastatin', '10 mg', '09:00 PM', FALSE),
(1, 'Vitamin D3', '1000 IU', 'After lunch', FALSE);

INSERT INTO doctor_notes (patient_id, doctor_name, severity, note, created_at)
VALUES
(1, 'Dr. Priya Reddy', 'follow-up', 'Patient should maintain fasting glucose log for the next 7 days.', NOW() - INTERVAL 2 DAY),
(1, 'Dr. Arun Kumar', 'routine', 'Blood pressure is manageable. Continue current medication schedule.', NOW() - INTERVAL 1 DAY);
