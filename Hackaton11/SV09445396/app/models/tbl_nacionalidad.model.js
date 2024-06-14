module.exports = (sequelize, DataType) => {
    const Nacionalidad = sequelize.define("tbl_nacionalidad", {
        descripcion: {
            type: DataType.STRING,
            allowNull: false
        },
        activo: {
            type: DataType.INTEGER,
            allowNull: false
        }
    });

    return Nacionalidad;
};