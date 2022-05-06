const express = require('express');
const routes = express.Router();
const { Activity, Country } = require('../db')
const { getDb } = require("../controlCountry")



routes.post('/', async (req, res) => {
    const { name, difficulty, duration, season, countries } = req.body;
    const createAct = await Activity.create({
        name,
        difficulty,
        duration,
        season,
    })
    const actDb = await Country.findAll({
         where: {
             name: countries
         }
    })
    createAct.addActivity(actDb)
    res.status(200).send("Activity created successfully.")
    console.log(createAct);
})

// routes.post('/', async(req, res) => {
//     const { name, difficulty, duration, season, countries } = req.body;

// })




module.exports = routes