module.exports = (sequelize, DataType) => {
    const Mascota = sequelize.define("tbl_mascotas", {
        nombre: {
            type: DataType.STRING,
            allowNull: false
        },
        fechanacimiento: {
            type: DataType.DATE,
            allowNull: false
        },
        activo: {
            type: DataType.INTEGER,
            allowNull: false
        }
    });

    return Mascota;
};