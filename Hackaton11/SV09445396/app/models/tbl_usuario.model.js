module.exports = (sequelize, DataType) => {
    const Usuario = sequelize.define("tbl_usuario", {
        username: {
            type: DataType.STRING,
            allowNull: false
        },
        password: {
            type: DataType.STRING,
            allowNull: false
        },
        email: {
            type: DataType.STRING,
            allowNull: false
        },
        activo: {
            type: DataType.INTEGER,
            allowNull: false
        }
    });

    return Usuario;
};