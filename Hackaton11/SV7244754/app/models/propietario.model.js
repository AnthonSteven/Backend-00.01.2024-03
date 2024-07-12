module.exports = (sequelize, DataTypes) => {
    const Propietario = sequelize.define("tlb_propietario", {
        Nombre: {
            type: DataTypes.STRING,
        },
        Apellido: {
            type: DataTypes.STRING,
        },
        Documento: {
            type: DataTypes.STRING,
            unique: true,
        },
        Telefono: {
            type: DataTypes.STRING,
        },
    });

    return Propietario;
};