let compras = [];

function mostrarCompletados(req, res) {
    let completados = compras.filter(compra => compra.esCompletado);
    res.end(JSON.stringify(completados));
}

module.exports = mostrarCompletados;