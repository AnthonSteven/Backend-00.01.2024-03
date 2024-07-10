const courseModel = require('../models/Course')

const getCourses = async (req, res) => {
  try {
    const getAllCourses = await courseModel.find()
    res.status(200).json(getAllCourses)
  } catch (error) {
    return res.status(404).json({ msg: error })
  }
}

const createCourses = async (req, res) => {
  try {
    const { nombre, descripcion, portada, valor } = req.body
    const createdCourse = await courseModel.create({ nombre, descripcion, portada, valor, img: req.file.path})
    
    return res.status(200).send(createdCourse)
  } catch (error) {
    return res.status(404).json({ msg: error })
  }
}


const updateCourses = async (req, res) => {
  try {
    const id = req.params.id
    const { nombre, descripcion, portada, valor } = req.body
    const updateCourse = await courseModel.updateOne( { _id: id }, {$set:{ nombre, descripcion, portada, valor } }   )
    return res.status(200).send(updateCourse)
  } catch (error) {
    // return res.status(404).json({ msg: error })
    return res.status(500).send('Error al actualizar el documento');
  }
}

const deleteCourses = async (req, res) => {
  try {
    const id = req.params.id
    await courseModel.findOneAndDelete(id)
    return res.status(200).send(`el curso con el id: ${id} a sido eliminado`)
  } catch (error) {
    return res.status(404).json({ msg: error })
  }
}

module.exports = { getCourses, createCourses, updateCourses, deleteCourses }
