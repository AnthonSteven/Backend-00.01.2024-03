// controllers/courseController.js

const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
    try {
        const { name, description, img, cover, price } = req.body;

        const newCourse = new Course({ name, description, img, cover, price });

        await newCourse.save();

        res.status(201).json({ message: "Curso creado exitosamente", course: newCourse });
    } catch (error) {
        res.status(500).json({ message: "Error al crear el curso" });
    }
};

exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find();

        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los cursos" });
    }
};

exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ message: "Curso no encontrado" });
        }

        res.json(course);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el curso" });
    }
};

exports.updateCourse = async (req, res) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedCourse) {
            return res.status(404).json({ message: "Curso no encontrado" });
        }

        res.json({ message: "Curso actualizado exitosamente", course: updatedCourse });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el curso" });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);

        if (!deletedCourse) {
            return res.status(404).json({ message: "Curso no encontrado" });
        }

        res.json({ message: "Curso eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el curso" });
    }
};