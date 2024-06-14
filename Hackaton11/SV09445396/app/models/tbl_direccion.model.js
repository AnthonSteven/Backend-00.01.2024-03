module.exports = (sequelize, DataType) => {
    const Direccion = sequelize.define("tbl_direccion", {
        ubigeo: {
            type: DataType.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataType.STRING,
            allowNull: false
        },
        activo: {
            type: DataType.INTEGER,
            allowNull: false
        }
    });

    return Direccion;
};