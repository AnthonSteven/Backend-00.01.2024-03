const Cliente = require('../models/Cliente')

exports.getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();

    res.json(clientes)

  } catch (error) {
    res.status(200).json({ error: 'Error al obtener clientes.', error })
  }
}

exports.getCliente = async (req, res) => {
  try {
    // console.log(req.params)
    const { id } = req.params
    const cliente = await Cliente.findByPk(id)

    if (!cliente) {
      return res.json({ msg: `El usuario con el id:${id} no existe!` })
    }

    return res.send(cliente)

  } catch (error) {
    res.status(200).json({ error: 'Error al obtener cliente', error })
  }
}

exports.createCliente = async (req, res) => {
  try {
    const { nombre, direccion, telefono, email, edad } = req.body;

    const newCliente = await Cliente.create({ nombre, direccion, telefono, email, edad });

    res.json(newCliente)
  } catch (error) {
    res.status(200).json({ error: 'Error al crear el cliente.', error })
  }
}

exports.updateCliente = async (req, res) => {
  try {
    const { nombre, direccion, telefono, email, edad } = req.body;
    const { id } = req.params;
    const cliente = await Cliente.findByPk(id)
    if(!cliente) {
      return res.status(400).json({msg: 'El usuario a actualizar no existe!'})
     }

     cliente.nombre = nombre;
     cliente.direccion = direccion;
     cliente.telefono = telefono;
     cliente.email = email;
     cliente.edad = edad;

     await cliente.save()
     return res.send({
      msg: 'El cliente ah sido actualizado',
      cliente
     })
  } catch (error) {
    res.status(200).json({ error: 'Error al crear el cliente.', error })
  }
}

exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    const cliente = await Cliente.findByPk(id)

    if (!cliente) {
      return res.json(`el cliente con el id: ${id} no existe!.`)
    }

    await cliente.destroy();

    res.json(`el cliente con el id: ${id}  a sido eliminado`)
  } catch (error) {
    res.status(200).json({ error: 'Error al eliminar el cliente.', error })
  }
}