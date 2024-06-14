module.exports = (sequelize, DataType) => {
    const Color = sequelize.define("tbl_color", {
        descripcion: {
            type: DataType.STRING,
            allowNull: false
        },
        activo: {
            type: DataType.INTEGER,
            allowNull: false
        }
    });

    return Color;
};