const { tipodocumento } = require("./tbl_tipo_documento.model");
const { nacionalidad } = require("./tbl_nacionalidad.model");

module.exports = (sequelize, DataType) => {
    const Propietario = sequelize.define("tbl_propietario", {
        nombre: {
            type: DataType.STRING,
            allowNull: false
        },
        apellido: {
            type: DataType.STRING,
            allowNull: false
        },
        documento: {
            type: DataType.STRING,
            allowNull: false
        },
        telefono: {
            type: DataType.STRING,
            allowNull: false
        },
        activo: {
            type: DataType.INTEGER,
            allowNull: false
        }
        // ubigeo: {
        //     type: DataType.STRING,
        //     allowNull: false
        // },        
        // idtipoidentidad:{
        //     type: DataType.INTEGER,
        //     references:{
        //         model: tipodocumento,
        //         key: 'id'
        //     }
        // }
        // idnacionalidad:{
        //     type: DataType.INTEGER,
        //     references:{
        //         model: nacionalidad,
        //         key: 'id'
        //     }
        // }
    });

    return Propietario;
};