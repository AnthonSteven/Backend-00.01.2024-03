module.exports = (sequelize, Sequelize) => {
    const Especie = sequelize.define("tlb_especie", {
        Descripcion: {
            type: Sequelize.STRING
        },
    });

    return Especie;
};
