const axios = require("axios");
const { Country, Activity } = require("./db");


const getInfo = async () => {
    let getAll = await axios.get('https://restcountries.com/v3/all');
    await getAll.data.map(e => {
        Country.findOrCreate({
            where: {
                cca3: e.cca3,
                name: e.name['common'],
                flags: e.flags[1],
                continents: e.continents[0],
                capital: e.capital?e.capital[0]:"Capital not found.",
                subregion: e.subregion?e.subregion:"Not defined.",
                area: e.area,
                population: e.population
            }    
        });   
    })
}


const getAct = async () => {
    return await Country.findAll({
        include: {
            model: Activity,
            attributes: ['name', 'difficulty', 'duration', 'season'],
            through: {
                attributes: []
            }
        }
    })
}

const getDb = async () => {
    await getInfo();
    const act = await getAct();
    return act;
}




module.exports = { getDb, getInfo, getAct }