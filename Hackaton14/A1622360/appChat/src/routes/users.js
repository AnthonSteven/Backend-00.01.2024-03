const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar_jwt');

const { getUsuarios } = require('../controllers/users');

const router = Router();


router.get('/', validarJWT, getUsuarios);
module.exports = router;