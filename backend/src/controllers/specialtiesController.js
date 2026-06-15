import specialtiesModel from "../models/specialties.js";

const specialtiesController = {};

specialtiesController.getAllSpecialties = async (req, res) => {
    try {
        const specialties = await specialtiesModel.find();
        return res.status(200).json(specialties);
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

specialtiesController.insertSpecialty = async (req, res) => {
    try {
        const { specialtyName, description, isAvailable } = req.body;

        const newSpecialty = new specialtiesModel({
            specialtyName,
            description,
            isAvailable
        });

        await newSpecialty.save();
        return res.status(200).json({ message: "Specialty created" });
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

specialtiesController.updateSpecialty = async (req, res) => {
    try {
        const { specialtyName, description, isAvailable } = req.body;

        await specialtiesModel.findByIdAndUpdate(
            req.params.id,
            { specialtyName, description, isAvailable },
            { new: true }
        );

        return res.status(200).json({ message: "Specialty updated" });
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

specialtiesController.deleteSpecialty = async (req, res) => {
    try {
        await specialtiesModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Specialty deleted" });
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default specialtiesController;