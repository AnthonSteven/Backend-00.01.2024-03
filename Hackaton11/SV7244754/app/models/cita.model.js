module.exports = (sequelize, Sequelize) => {
    const Cita = sequelize.define("tlb_cita",{
        Codigo_Cita: {
            type: Sequelize.STRING,
            unique: true,
        },
        Motivo_Cita: {
            type:Sequelize.STRING
        },
    });
    return Cita;
};
