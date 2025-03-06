const express = require('express');
const client = require('./db');
const initdb = express.Router();
const format = require('pg-format');


initdb.get('/', async(req, res) => {

    // Anlegen der Tabelle futureTrips
    let query = `
            DROP TABLE IF EXISTS futureTrips;
            CREATE TABLE futureTrips(id serial PRIMARY KEY, 
                country VARCHAR(130) NOT NULL, 
                city VARCHAR(130) NOT NULL, 
                season VARCHAR(50),
                sightseeing VARCHAR(500),
                 budget DECIMAL(7,2), 
                 notes VARCHAR(500));
            `;

    try {
        await client.query(query)
        console.log("Table created successfully ...")
    } catch (err) {
        console.log(err)
    }

    // Befüllen der Tabelle futureTrips mit 15 Einträgen
    const values = [
["USA", "New York", "Winter", "Visit the Statue of Liberty and Times Square", 5000.00, "Winter season for fewer crowds"],
["Canada", "Toronto", "Spring", "Explore the CN Tower and Royal Ontario Museum", 3000.00, "Best time for outdoor activities"],
["Italy", "Rome", "Summer", "Visit the Colosseum and Roman Forum", 2500.00, "Summer can be hot, best to travel early in the morning"],
["France", "Paris", "Fall", "Tour the Eiffel Tower and Louvre Museum", 4500.00, "Autumn is ideal for enjoying the city’s beauty"],
["Germany", "Berlin", "Spring", "Visit the Berlin Wall and Brandenburg Gate", 3500.00, "Great spring weather for walking tours"],
["UK", "London", "Winter", "See the Tower of London and Buckingham Palace", 4000.00, "Cold but charming during the holidays"],
["Japan", "Tokyo", "Spring", "Explore Shibuya Crossing and Meiji Shrine", 5500.00, "Cherry blossoms are in full bloom"],
["Australia", "Sydney", "Summer", "Climb the Sydney Harbour Bridge and visit the Opera House", 6000.00, "Summer offers great weather for the beach"],
["Spain", "Barcelona", "Summer", "Visit the Sagrada Familia and Park Güell", 3500.00, "Perfect for a beach vacation with cultural exploration"],
["India", "New Delhi", "Winter", "See the Taj Mahal and India Gate", 1500.00, "Cooler temperatures are perfect for sightseeing"],
["Brazil", "Rio de Janeiro", "Spring", "Relax at Copacabana Beach and visit Sugarloaf Mountain", 2000.00, "Spring is mild and pleasant"],
["Mexico", "Mexico City", "Fall", "Visit Chapultepec Castle and Teotihuacan Pyramids", 2500.00, "Fall brings nice weather for exploring"],
["Egypt", "Cairo", "Winter", "Explore the Pyramids of Giza and the Sphinx", 4500.00, "Winter is the best time to visit due to cooler weather"],
["Thailand", "Bangkok", "Fall", "Visit the Grand Palace and Wat Arun", 3000.00, "Perfect weather for enjoying the city’s temples"],
["South Korea", "Seoul", "Spring", "See the palaces and visit Bukchon Hanok Village", 4000.00, "Spring brings beautiful cherry blossoms"]
        
    ];
    // hierfuer muss pg-format installiert werden (wegen %L):
    const paramquery = format('INSERT INTO futureTrips(country, city, season, sightseeing, budget, notes) VALUES %L RETURNING *', values);


    try {
        const result = await client.query(paramquery)
        console.log("15 futureTrips inserted ...")
        res.status(200)
        res.send(result.rows)
    } catch (err) {
        console.log(err)
    }

});


module.exports = initdb;