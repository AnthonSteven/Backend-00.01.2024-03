module.exports = (sequelize, Sequelize) => {
    const Mascota = sequelize.define("tlb_mascota", {
        Nombre: {
            type: Sequelize.STRING
        },
    });

    return Mascota;
};
