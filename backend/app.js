import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

//Libreria express
const app = express()
app.use(cors({
    origin: ["http://localhost:5123", "http://localhost:5174"],
    credentials: true
}))

app.use(cookieParser());
//Para que la api acepte JSON
app.use(express.json());


export default app;