// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const express = require('express');
const router = express.Router()
const route = require('./allCountRoutes')
const routes = require('./allActRoutes')


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/countries', route);
router.use('/activity', routes);


module.exports = router;