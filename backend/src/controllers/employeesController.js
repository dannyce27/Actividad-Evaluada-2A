const employeesController = {}

import employeesModel from "../models/employees.js"

employeesController.getEmployees = async (req, res) => {
    const employee = await employeesModel.find()
    res.json(employee);
};

employeesController.createEmployee = async (req, res) => {
    const { nombre, correo, contrasenia, telefono, direccion, puesto, fecha_contratacion, salario, DUI } = req.body;
    const newEmployee = new employeesModel({ nombre, correo, contrasenia, telefono, direccion, puesto, fecha_contratacion, salario, DUI });
    await newEmployee.save();
    res.json({ message: "Employee saved" })

}

employeesController.deleteEmployee = async (req, res) => {
    const deleteEmployee = await employeesModel.findByIdAndDelete(req.params.id);
    if (!deletedemployee) {
        return res.status(404).json({ message: "employee dont find" });
    }
    res.json({ message: "employee deleted" });
}

employeesController.updateEmployee = async (req, res) => {
    const { nombre, correo, contrasenia, telefono, direccion, puesto, fecha_contratacion, salario, DUI } = req.body;
    await employeesModel.findByIdAndUpdate(
        req.params.id, {
        nombre,
        correo,
        contrasenia,
        telefono,
        direccion,
        puesto,
        fecha_contratacion,
        salario,
        DUI
    },
        { new: true }
    );
    res.json({ message: "employee updated" });
};

export default employeesController;