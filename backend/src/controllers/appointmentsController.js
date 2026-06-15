import appointmentsModel from "../models/appointments.js";

const appointmentsController = {};

appointmentsController.getAllAppointments = async (req, res) => {
    try {
        const appointments = await appointmentsModel
            .find()
            .populate("patient_id", "name lastName email")
            .populate("specialty_id", "name");
        return res.status(200).json(appointments);
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

appointmentsController.insertAppointment = async (req, res) => {
    try {
        const { patient_id, specialty_id, appointmentDate, reason, status, observations } = req.body;

        const newAppointment = new appointmentsModel({
            patient_id,
            specialty_id,
            appointmentDate,
            reason,
            status,
            observations
        });

        await newAppointment.save();
        return res.status(200).json({ message: "Appointment created" });
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

appointmentsController.updateAppointment = async (req, res) => {
    try {
        const { patient_id, specialty_id, appointmentDate, reason, status, observations } = req.body;

        await appointmentsModel.findByIdAndUpdate(
            req.params.id,
            { patient_id, specialty_id, appointmentDate, reason, status, observations },
            { new: true }
        );

        return res.status(200).json({ message: "Appointment updated" });
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

appointmentsController.deleteAppointment = async (req, res) => {
    try {
        await appointmentsModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Appointment deleted" });
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default appointmentsController;