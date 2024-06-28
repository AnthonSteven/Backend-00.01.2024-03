/* eslint-disable eol-last */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
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
    const { nombre, descripcion, valor } = req.body
    const imagePath = req.files.image[0].path
    const portada = req.files.portada[0].path

    const createdCourse = await courseModel.create({ nombre, descripcion, portada, valor, img: imagePath })
    // console.log(createdCourse)
    return res.status(200).send(createdCourse)
  } catch (error) {
    return res.status(404).json({ msg: error })
  }
}

const updateCourses = async (req, res) => {
  try {
    const id= req.params.id

    const { nombre, descripcion, valor} = req.body
   
    const existingCourse = await courseModel.findById(id)
    if(!existingCourse){
      return res.status(404).send('el curso a actulizar no existe')
    }
   
    const updateCourse = await courseModel.findByIdAndUpdate(
      id , 
      {nombre  ,descripcion , valor},
      { new: true}
    );

    return res.status(200).json(updateCourse)

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const deleteCourses = async (req, res) => {
  try {
    const id = req.params.id
    const findCourse = courseModel.findById(id)
    if (!findCourse) {
      return res.status(400).send('El usuario a eliminar no existe')
    }

    await courseModel.findOneAndDelete(id)

    return res.status(200).send(`el curso con el id: ${id} a sido eliminado`)
  } catch (error) {
    return res.status(404).json({ msg: error })
  }
}

module.exports = { getCourses, createCourses, updateCourses, deleteCourses }