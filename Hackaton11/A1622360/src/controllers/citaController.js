const Cita = require('../models/Cita')

exports.getCitas = async (req, res) => {
  try {
    const Citas = await Cita.findAll();

    res.json(Citas)

  } catch (error) {
    res.status(200).json({ error: 'Error al obtener Citas.', error })
  }
}

exports.getCita = async (req, res) => {
  try {
    // console.log(req.params)
    const { id } = req.params
    const Cita = await Cita.findByPk(id)

    if (!Cita) {
      return res.json({ msg: `El usuario con el id:${id} no existe!` })
    }

    return res.send(Cita)

  } catch (error) {
    res.status(200).json({ error: 'Error al obtener Cita', error })
  }
}

exports.createCita = async (req, res) => {
  try {
    const { fecha, descripcion, mascotaId } = req.body;

    const newCita = await Cita.create({ fecha, descripcion, mascotaId });

    res.json(newCita)
  } catch (error) {
    res.status(200).json({ error: 'Error al crear la Cita.', error })
  }
}

exports.updateCita = async (req, res) => {
  try {
    const { nombre, direccion, telefono, email, edad } = req.body;
    const { id } = req.params;
    const Cita = await Cita.findByPk(id)
    if(!Cita) {
      return res.status(400).json({msg: 'El usuario a actualizar no existe!'})
     }

     Cita.nombre = nombre;
     Cita.direccion = direccion;
     Cita.telefono = telefono;
     Cita.email = email;
     Cita.edad = edad;

     await Cita.save()
     return res.send({
      msg: 'El Cita ah sido actualizado',
      Cita
     })
  } catch (error) {
    res.status(200).json({ error: 'Error al crear el Cita.', error })
  }
}

exports.deleteCita = async (req, res) => {
  try {
    const { id } = req.params;

    const Cita = await Cita.findByPk(id)

    if (!Cita) {
      return res.json(`el Cita con el id: ${id} no existe!.`)
    }

    await Cita.destroy();

    res.json(`el Cita con el id: ${id}  a sido eliminado`)
  } catch (error) {
    res.status(200).json({ error: 'Error al eliminar el Cita.', error })
  }
}