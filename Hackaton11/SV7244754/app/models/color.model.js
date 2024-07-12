module.exports = (sequelize, Sequelize) => {
    const Color = sequelize.define("tlb_color", {
        Descripcion: {
            type: Sequelize.STRING
        },
    });

    return Color;
};
