let compras = [];

function crearLista(req, res) {
    let nuevaCompra = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        fecha: req.body.fecha,
        esCompletado: false
    };

    compras.push(nuevaCompra);
    res.end('Lista de compras creada exitosamente');
}

module.exports = crearLista;