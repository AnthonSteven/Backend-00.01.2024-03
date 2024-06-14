const Cliente = require('../models/Cliente');
const Mascota = require('../models/Mascota')

exports.getMascotas = async (req, res) => {
  try {
    const Mascotas = await Mascota.findAll();

    res.json(Mascotas)

  } catch (error) {
    res.status(200).json({ error: 'Error al obtener Mascotas.', error })
  }
}

exports.getMascota = async (req, res) => {
  try {
    // console.log(req.params)
    const { id } = req.params
    const mascota = await Mascota.findByPk(id)

    console.log(Mascota)
    const cliente = await Cliente.findByPk(mascota.clienteId);

    if (!mascota) {
      return res.json({ msg: `El usuario con el id:${id} no existe!` })
    }

    return res.send({
      mascota,
      cliente
    })

  } catch (error) {
    res.status(200).json({ error: 'Error al obtener Mascota', error })
  }
}

exports.createMascota = async (req, res) => {
  try {
    const { nombre, especie, raza, clienteId } = req.body;

    const newMascota = await Mascota.create({ nombre, especie, raza, clienteId  });

    res.json(newMascota)
  } catch (error) {
    res.status(200).json({ error: 'Error al crear el Mascota.', error })
  }
}

exports.updateMascota = async (req, res) => {
  try {
    const { nombre, direccion, telefono, email, edad } = req.body;
    const { id } = req.params;
    const Mascota = await Mascota.findByPk(id)
    if(!Mascota) {
      return res.status(400).json({msg: 'El usuario a actualizar no existe!'})
     }

     Mascota.nombre = nombre;
     Mascota.direccion = direccion;
     Mascota.telefono = telefono;
     Mascota.email = email;
     Mascota.edad = edad;

     await Mascota.save()
     return res.send({
      msg: 'El Mascota ah sido actualizado',
      Mascota
     })
  } catch (error) {
    res.status(200).json({ error: 'Error al crear el Mascota.', error })
  }
}

exports.deleteMascota = async (req, res) => {
  try {
    const { id } = req.params;

    const mascota = await Mascota.findByPk(id)

    if (!mascota) {
      return res.json(`la Mascota con el id: ${id} no existe!.`)
    }

    await mascota.destroy();

    res.json(`el Mascota con el id: ${id}  a sido eliminado`)
  } catch (error) {
    res.status(200).json({ error: 'Error al eliminar el Mascota.', error })
  }
}