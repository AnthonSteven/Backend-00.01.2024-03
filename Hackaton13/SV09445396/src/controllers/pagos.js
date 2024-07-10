const pagoModel = require('../models/Pago')

const getPagos = async (req, res) => {
    try {
      const getAllPagos = await pagoModel.find()
      res.status(200).json(getAllPagos)
    } catch (error) {
      return res.status(404).json({ msg: error })
    }
  }

const createPagos = async (req, res) => {
    try {
      const { numtarjeta, fechaven, codigo } = req.body

      if(numtarjeta.length != 16){
        return res.status(400).send("Numero de tarjeta invalida")  
      }

      if(fechaven.length != 4){
        return res.status(400).send("Fecha de vencimiento invalida [mmaa]")  
      }

      if(codigo.length != 3){
        return res.status(400).send("Codigo invalido, debe tener 3 digitos")  
      }
      const createdPago = await pagoModel.create({ numtarjeta, fechaven, codigo })      

      return res.status(200).send(createdPago)
    } catch (error) {
      return res.status(404).json({ msg: error })
    }
  }
  
  const updatePagos = async (req, res) => {
    try {
      const id = req.params.id
      const { numtarjeta, fechaven, codigo } = req.body
      const updatePago = await pagoModel.updateOne( { _id: id }, {$set:{ numtarjeta, fechaven, codigo } }   )

      return res.status(200).send(updatePago)
    } catch (error) {
      return res.status(500).send('Error al actualizar pago');
    }
  }
  
  const deletePagos = async (req, res) => {
    try {
      const id = req.params.id
      await pagoModel.findOneAndDelete(id)
      return res.status(200).send(`El pago con el id: ${id} a sido eliminado`)
      
    } catch (error) {
      return res.status(404).json({ msg: error })
    }
  }
  
  module.exports = { getPagos, createPagos, updatePagos, deletePagos }
  