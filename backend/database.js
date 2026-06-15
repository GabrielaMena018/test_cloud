import mongoose from "mongoose";
mongoose.connect("mongodb://localhost:27017/HospitalRosales")

const connection = mongoose.connection

//Base de datos conectada 
connection.once("open", () => {
    console.log("Base de datos conectada")
})

//Base de datos desconectada
connection.on("disconnected", () => {
    console.log("conexión a la base de datos desconectada")
})

//Error
connection.on("error", (error) => {
    console.log("Error en la conexión de ka base de datos " + error)
})