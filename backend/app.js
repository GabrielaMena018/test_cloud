import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import registerPatientRoutes from "./src/routes/registerpatient.js";
import patient from "./src/routes/patients.js";
import login from "./src/routes/loginPatients.js"

//Libreria express
const app = express()
app.use(cors({
    origin: ["http://localhost:5123", "http://localhost:5174"],
    credentials: true
}))

app.use(cookieParser());
//Para que la api acepte JSON
app.use(express.json());

app.use("/api/PatientRegister", registerPatientRoutes);
app.use("/api/patients", patient);
app.use("/api/login", login)


export default app;