module.exports = (sequelize, Sequelize) => {
    const Raza = sequelize.define("tlb_raza", {
        Descripcion: {
            type: Sequelize.STRING
        },
    });

    return Raza;
};
