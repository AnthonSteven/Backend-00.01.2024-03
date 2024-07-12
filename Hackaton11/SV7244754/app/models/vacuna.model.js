module.exports = (sequelize, Sequelize) => {
    const Vacuna = sequelize.define("tlb_vacuna", {
        Descripcion: {
            type: Sequelize.STRING
        },
    });

    return Vacuna;
};
