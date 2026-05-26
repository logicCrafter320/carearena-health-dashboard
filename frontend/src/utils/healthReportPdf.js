const formatDate = (value) => {
  if (!value) return "Not recorded";
  return new Date(value).toLocaleString();
};

const text = (value, fallback = "Not provided") => {
  if (value === 0) return "0";
  return value ? String(value) : fallback;
};

const getLatestVitals = (vitals = []) => vitals.at(-1) || null;

const getAdherence = (medications = []) => {
  if (!medications.length) return 0;
  const taken = medications.filter((item) => item.is_taken).length;
  return Math.round((taken / medications.length) * 100);
};

const getHealthStatus = (latest, alerts = []) => {
  if (!latest) return "No vitals recorded";
  if (alerts.some((alert) => alert.severity === "critical")) return "Critical attention required";
  if (alerts.some((alert) => alert.severity === "warning")) return "Needs monitoring";
  if (latest.glucose >= 180 || latest.heart_rate > 110 || latest.temperature >= 100.4) return "Critical attention required";
  if (latest.glucose >= 140 || latest.systolic >= 140 || latest.diastolic >= 90) return "Needs monitoring";
  return "Stable";
};

function createWriter(doc) {
  const page = { width: doc.internal.pageSize.getWidth(), height: doc.internal.pageSize.getHeight() };
  let y = 18;

  const ensureSpace = (height = 16) => {
    if (y + height < page.height - 16) return;
    doc.addPage();
    y = 18;
  };

  const section = (title) => {
    ensureSpace(18);
    y += 5;
    doc.setFillColor(240, 248, 245);
    doc.roundedRect(14, y - 7, page.width - 28, 11, 2, 2, "F");
    doc.setTextColor(18, 72, 64);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(title, 18, y);
    y += 12;
  };

  const line = (label, value, x = 18) => {
    ensureSpace(8);
    doc.setTextColor(87, 96, 105);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(`${label}:`, x, y);
    doc.setTextColor(11, 29, 43);
    doc.setFont("helvetica", "normal");
    doc.text(text(value), x + 42, y);
    y += 7;
  };

  const note = (value) => {
    ensureSpace(10);
    doc.setTextColor(87, 96, 105);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(value, 18, y);
    y += 8;
  };

  const table = (headers, rows, emptyText) => {
    if (!rows.length) {
      note(emptyText);
      return;
    }

    const x = 18;
    const width = page.width - 36;
    const colWidth = width / headers.length;
    const rowHeight = 8;

    ensureSpace(rowHeight * (rows.length + 2));
    doc.setFillColor(11, 29, 43);
    doc.roundedRect(x, y - 5, width, rowHeight, 1.5, 1.5, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    headers.forEach((header, index) => doc.text(header, x + index * colWidth + 2, y));
    y += rowHeight;

    rows.forEach((row, rowIndex) => {
      ensureSpace(rowHeight + 2);
      doc.setFillColor(rowIndex % 2 === 0 ? 252 : 246, rowIndex % 2 === 0 ? 250 : 248, rowIndex % 2 === 0 ? 247 : 244);
      doc.rect(x, y - 5, width, rowHeight, "F");
      doc.setTextColor(11, 29, 43);
      doc.setFont("helvetica", "normal");
      row.forEach((cell, index) => {
        const value = doc.splitTextToSize(text(cell, "-"), colWidth - 4)[0] || "-";
        doc.text(value, x + index * colWidth + 2, y);
      });
      y += rowHeight;
    });
    y += 4;
  };

  return { page, section, line, note, table, getY: () => y, setY: (value) => { y = value; } };
}

export async function generateHealthReport(data) {
  if (!data?.patient) throw new Error("Patient data is unavailable");
  const { jsPDF } = await import("jspdf");

  const patient = data.patient;
  const vitals = data.vitals || [];
  const alerts = data.alerts || [];
  const medications = data.medications || [];
  const notes = data.notes || [];
  const latest = getLatestVitals(vitals);
  const adherence = getAdherence(medications);
  const status = getHealthStatus(latest, alerts);
  const warningAlerts = alerts.filter((alert) => alert.severity === "warning");
  const criticalAlerts = alerts.filter((alert) => alert.severity === "critical");
  const takenMeds = medications.filter((item) => item.is_taken);
  const pendingMeds = medications.filter((item) => !item.is_taken);

  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const writer = createWriter(doc);

  doc.setFillColor(11, 29, 43);
  doc.rect(0, 0, writer.page.width, 34, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("CareArena Health Report", 14, 16);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Generated: ${formatDate(new Date().toISOString())}`, 14, 24);
  doc.text(`Patient Email: ${text(patient.email)}`, 118, 24);
  writer.setY(43);

  writer.section("Patient Details");
  writer.line("Full Name", patient.name);
  writer.line("Age", patient.age);
  writer.line("Gender", patient.gender);
  writer.line("Condition", patient.condition_name);
  writer.line("Doctor", patient.doctor_name);

  writer.section("Latest Vitals");
  if (latest) {
    writer.line("Blood Pressure", `${latest.systolic}/${latest.diastolic} mmHg`);
    writer.line("Glucose", `${latest.glucose} mg/dL`);
    writer.line("Heart Rate", `${latest.heart_rate} BPM`);
    writer.line("Temperature", `${latest.temperature} F`);
    writer.line("Recorded At", formatDate(latest.recorded_at));
  } else {
    writer.note("No vitals recorded");
  }

  writer.section("Health Summary");
  writer.line("Current Status", status);
  writer.line("Medication Adherence", `${adherence}%`);
  writer.line("Active Alerts", alerts.length);
  writer.line("Warnings", warningAlerts.length);
  writer.line("Critical Alerts", criticalAlerts.length);

  writer.section("Vitals History");
  writer.table(
    ["Date", "BP", "Glucose", "Heart Rate", "Temp"],
    vitals.slice(-10).reverse().map((row) => [
      new Date(row.recorded_at).toLocaleDateString(),
      `${row.systolic}/${row.diastolic}`,
      `${row.glucose}`,
      `${row.heart_rate}`,
      `${row.temperature}`
    ]),
    "No vitals recorded"
  );

  writer.section("Alerts Summary");
  writer.table(
    ["Severity", "Message", "Date"],
    alerts.slice(0, 8).map((alert) => [alert.severity, alert.message, formatDate(alert.created_at)]),
    "No active alerts"
  );

  writer.section("Medication Summary");
  writer.line("Taken", takenMeds.length);
  writer.line("Pending / Missed", pendingMeds.length);
  writer.table(
    ["Medicine", "Dosage", "Time", "Status"],
    medications.map((item) => [item.medicine_name, item.dosage, item.medication_time, item.is_taken ? "Taken" : "Pending"]),
    "No medication records"
  );

  writer.section("Doctor Notes");
  writer.table(
    ["Doctor", "Severity", "Observation"],
    notes.slice(0, 6).map((noteItem) => [noteItem.doctor_name, noteItem.severity, noteItem.note]),
    "No doctor notes available"
  );

  doc.setProperties({
    title: `CareArena Health Report - ${patient.name || patient.email}`,
    subject: "Patient health monitoring report",
    author: "CareArena"
  });

  const fileName = `CareArena-Health-Report-${text(patient.name || patient.email, "Patient").replace(/[^a-z0-9]+/gi, "-")}.pdf`;
  doc.save(fileName);
}
