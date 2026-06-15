import app from "./app.js"
import "./database.js"

//Ejecutar servidor
async function main(){
    app.listen(4000)
    console.log("Servidor escuchado en el puerto 4000")
}

main()