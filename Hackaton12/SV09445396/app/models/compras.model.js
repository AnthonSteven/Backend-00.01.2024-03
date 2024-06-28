module.exports = (sequelize, DataType) => {
    const Compras = sequelize.define("compras", {
        nombre: {
            type: DataType.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataType.STRING,
            allowNull: false
        },
        cantidad: {
            type: DataType.INTEGER,
            allowNull: false
        },
        fecha: {
            type: DataType.DATE,
            allowNull: false
        },
        escompletado: {
            type: DataType.INTEGER,
            allowNull: false
        }
        
    });

    return Compras;
};