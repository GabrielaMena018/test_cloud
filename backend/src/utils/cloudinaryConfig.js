import multer from "multer";
import {CloudinaryStorge} from "multer-storage-cloudinary"
import { v2 as cloudinary } from "cloudinary";
import { config } from "../../config.js";

//Configaramos cloudinary con nuestras credenciales
cloudinary.config({
    cloud_name: config.cloudinary.cloudinary_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret
})

//Configuramos como guardamos las imagenes
const storage = new CloudinaryStorge({
    cloudinary: cloudinary,
    params: {
        folder: "HospitalRosales",
        allowed_formats: ["jpg", "png", "jpeg"]
    },
});

//Configuramos el multer
const upload = multer ({storage});

export default upload