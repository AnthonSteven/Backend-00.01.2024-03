const ordenesModel = require('../models/Orders')

const getOrdenes = async (req, res) => {
    try {
      const getAllOrdenes = await ordenesModel.find()
      res.status(200).json(getAllOrdenes)
    } catch (error) {
      return res.status(404).json({ msg: error })
    }
  }

const createOrdenes = async (req, res) => {
    try {
      const { numorden, nomcurso, cantidad } = req.body
      const createdOrder = await ordenesModel.create({  numorden, nomcurso, cantidad })      

      return res.status(200).send(createdOrder)
    } catch (error) {
      return res.status(404).json({ msg: error })
    }
  }
  
  const updateOrdenes = async (req, res) => {
    try {
      const id = req.params.id
      const { numorden, nomcurso, cantidad } = req.body
      const updateOrdenes = await ordenesModel.updateOne( { _id: id }, {$set:{ numorden, nomcurso, cantidad } }   )

      return res.status(200).send(updateOrdenes)
    } catch (error) {
      // return res.status(404).json({ msg: error })
      return res.status(500).send('Error al actualizar el documento');
    }
  }
  
  const deleteOrdenes = async (req, res) => {
    try {
      const id = req.params.id
      await ordenesModel.findOneAndDelete(id)
      return res.status(200).send(`La orden con el id: ${id} a sido eliminada`)

    } catch (error) {
      return res.status(404).json({ msg: error })
    }
  }
  
  module.exports = { getOrdenes, createOrdenes, updateOrdenes, deleteOrdenes }
  