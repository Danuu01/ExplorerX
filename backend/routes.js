const express = require('express');
const router = express.Router();
const client = require ('./db');

// eine GET-Anfrage
router.get('/', async(req, res) => {

    res.send({ message: "Hello FIW!" });
});




// get one vocabulary with id
router.get('/futureTrips/:id', async(req, res) => {
    const query = `SELECT * FROM futureTrips WHERE id=$1`;

    try {
        const id = req.params.id;
        const result = await client.query(query, [id])
        console.log(result)
        if (result.rowCount == 1)
            res.send(result.rows[0]);
        else {
            res.status(404)
            res.send({ message: "No futuretrip found with id=" + id });
        }
    } catch (err) {
        console.log(err.stack)
    }
});




// update one futureTrips
router.put('/futureTrips/:id', async(req, res) => {
    const query = `SELECT * FROM futureTrips WHERE id=$1`;

    let id = req.params.id;
    const result = await client.query(query, [id])
    if(result.rowCount > 0)
    {
        let futureTrips = result.rows[0];
        let country = (req.body.country) ? req.body.country : futureTrips.country;
        let city = (req.body.city) ? req.body.city : futureTrips.city;
        let season = (req.body.season) ? req.body.season : futureTrips.season;
        let sightseeing =(req.body.sightseeing) ? req.body.sightseeing : futureTrips.sightseeing;
        let budget =(req.body.budget) ? req.body.budget : futureTrips.budget;
        let notes =(req.body.notes) ? req.body.notes : futureTrips.notes;

        const updatequery = `UPDATE futureTrips SET 
            country = $1, 
            city = $2,
            season = $3,
            sightseeing = $4,
            budget = $5,
            notes = $6
            WHERE id=$7;`;
        const updateresult = await client.query(updatequery, [country, city, season, sightseeing,budget,notes,id]);
        console.log(updateresult)
        res.send({ id, country, city, season,sightseeing,budget,notes });
    } else {
        res.status(404)
        res.send({
            error: "futureTrips with id=" + id + " does not exist!"
        })
    }
});
// delete one futureTrips by id
router.delete('/futureTrips/:id', async(req, res) => {
    const query = `DELETE FROM futureTrips WHERE id=$1`;
    try {
        const id = req.params.id;
        const result = await client.query(query, [id])
        console.log(result)
        if (result.rowCount == 1)
            res.send({ message: "Trip with id=" + id + " deleted" });
        else {
            res.status(404)
            res.send({ message: "No Trip found with id=" + id });
        }
    } catch (err) {
        console.log(err.stack)
    }
});

// get all futureTrips
router.get('/futureTrips', async(req, res) => {
    const query = `SELECT * FROM futureTrips `;

    try {
        const result = await client.query(query)
        console.log(result)
        res.send(result.rows);
    } catch (err) {
        console.log(err.stack)
    }
});

// post one futureTrips
router.post('/futureTrips', async(req, res) => {
    let country = (req.body.country) ? req.body.country : null;
    let city = (req.body.city) ? req.body.city : null;
    let season = (req.body.season) ? req.body.season : null;
    let sightseeing = (req.body.sightseeing) ? req.body.sightseeing : null;
    let budget = (req.body.budget) ? req.body.budget : null;
    let notes = (req.body.notes) ? req.body.notes : null;
    const query = `INSERT INTO futureTrips(country, city, season, sightseeing, budget, notes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    try {
        const result = await client.query(query, [country, city, season, sightseeing, budget, notes])
        console.log(result)
        res.send(result.rows[0]);
    } catch (err) {
        console.log(err.stack)
    }

});

module.exports = router;

