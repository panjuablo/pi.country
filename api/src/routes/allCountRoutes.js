const express = require('express');
const route = express.Router();
const sequelize = require('sequelize');
const { Op } = require('sequelize')
const { Country, Activity } = require("../db");
const { getDb } = require("../controlCountry");


route.get('/', async (req, res) => { 
    const name = req.query.name;
    const allInfo = await getDb();
    
    try {
        if(name){
            let nameCount = await allInfo.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
            nameCount.length ? res.status(200).send(nameCount) : res.status(404).send("The country does not exist.");
        } else {
            res.status(200).send(allInfo);
        }
    } catch(error) {
        res.status(404).send('Error')
    }   
})

// route.get('/:idPais', async (req, res) => {
//     const { idPais } = req.params;
//     try {
//         let idCount = await Country.findOne({ where: {cca3: {[Op.iLike]:`${idPais}`}}})
//         idCount ? res.status(200).send(idCount) : res.status(404).send("Id no found.");
//     } catch (error) {
//         res.status(404).send('Error')
//     }
// })

route.get('/:idPais', async (req, res) => {
    const { idPais } = req.params;
    try {
        const allDb = await getDb()
        const idCount =  allDb.filter( e => e.cca3.toUpperCase() == idPais.toLocaleUpperCase() )
        idCount.length ? res.status(200).send(idCount) : res.status(404).send("Id no found.");
    } catch (error) {
        res.status(404).send('Error')
    }
})

module.exports = route;