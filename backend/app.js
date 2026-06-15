import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import registerPatientRoutes from "./src/routes/registerpatient.js";
import patient from "./src/routes/patients.js";
import login from "./src/routes/loginPatients.js";
import appointmentsRoutes from "./src/routes/appointments.js";
import medicalRecordsRoutes from "./src/routes/medicalRecords.js";
import specialtiesRoutes from "./src/routes/specialties.js";

const app = express();

app.use(cors({
    origin: ["http://localhost:5123", "http://localhost:5174"],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.use("/api/PatientRegister", registerPatientRoutes);
app.use("/api/patients", patient);
app.use("/api/login", login);
app.use("/api/appointments", appointmentsRoutes);
app.use("/api/medical-records", medicalRecordsRoutes);
app.use("/api/specialties", specialtiesRoutes);

export default app;