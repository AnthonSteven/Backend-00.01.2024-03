module.exports = (sequelize, DataType) => {
    const Especie = sequelize.define("tbl_especie", {
        descripcion: {
            type: DataType.STRING,
            allowNull: false
        },
        activo: {
            type: DataType.INTEGER,
            allowNull: false
        }
    });

    return Especie;
};