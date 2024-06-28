
const ordersModel = require('../models/orders')


const getOrders = async (req, res) => {
  try {
    const getAllOrders = await ordersModel.find()
    

    res.status(200).json(getAllOrders)
  } catch (error) {
    return res.status(404).json({ msg: error })
  }
}

const createOrders = async (req, res) => {
  try {
    const { nombre, descripcion, valor } = req.body
    const imagePath = req.files.image[0].path
    

    const createdOrders = await ordersModel.create({ nombre, descripcion, valor, img: imagePath })
    // console.log(createdCourse)
    return res.status(200).send(createdOrders)
  } catch (error) {
    return res.status(404).json({ msg: error })
  }
}

const updateOrders = async (req, res) => {
    try {
      const id= req.params.id
  
      const { nombre, descripcion, valor} = req.body
     
      const existingOrders = await ordersModel.findById(id)
      if(!existingOrders){
        return res.status(404).send('el curso a actulizar no existe')
      }
     
      const updateOrders= await ordersModel.findByIdAndUpdate(
        id , 
        {nombre  ,descripcion , valor},
        { new: true}
      );
  
      return res.status(200).json(updateOrders)
  
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

const deleteOrders = async (req, res) => {
  try {
    const id = req.params.id
    const findOrders = ordersModel.findById(id)
    if (!findOrders) {
      return res.status(400).send('El usuario a eliminar no existe')
    }

    await ordersModel.findOneAndDelete(id)

    return res.status(200).send(`el curso con el id: ${id} a sido eliminado`)
  } catch (error) {
    return res.status(404).json({ msg: error })
  }
}

module.exports = { getOrders, createOrders, updateOrders, deleteOrders }