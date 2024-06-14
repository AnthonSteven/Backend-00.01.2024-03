module.exports = (sequelize, DataType) => {
    const Vacuna = sequelize.define("tbl_vacuna", {
        descripcion: {
            type: DataType.STRING,
            allowNull: false
        },
        activo: {
            type: DataType.INTEGER,
            allowNull: false
        }
    });

    return Vacuna;
};