module.exports = (sequelize, DataType) => {
    const TipoDocumento = sequelize.define("tbl_tipo_documento", {
        descripcion: {
            type: DataType.STRING,
            allowNull: false
        },
        activo: {
            type: DataType.INTEGER,
            allowNull: false
        }
    });

    return TipoDocumento;
};