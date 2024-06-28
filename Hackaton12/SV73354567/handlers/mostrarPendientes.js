let compras = [];

function mostrarPendientes(req, res) {
    let pendientes = compras.filter(compra => !compra.esCompletado);
    res.end(JSON.stringify(pendientes));
}

module.exports = mostrarPendientes;