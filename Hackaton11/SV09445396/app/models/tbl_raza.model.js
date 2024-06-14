module.exports = (sequelize, DataType) => {
    const Raza = sequelize.define("tbl_raza", {
        descripcion: {
            type: DataType.STRING,
            allowNull: false
        },
        activo: {
            type: DataType.INTEGER,
            allowNull: false
        }
    });

    return Raza;
};