// server.js
const express = require('express');
const cors  = require('cors')
const { Pool } = require('pg');
require('dotenv').config();


const app = express();
app.use(cors({
    origin: 'http://localhost:5500'
}))
app.use(express.json()); // Enable JSON body parsing

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "12345678",
    database: "postgres",
    port: 5431,
});

app.get('/ticket', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM ticket');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


app.post('/add', async (req, ress) => {

    try {
        const result = await pool.query('INSERT INTO ticket (start_airport, end_airport, go_date, back_date, passenger_adult, passenger_children, class, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [req.body.start_airport, req.body.end_airport, req.body.go_date, req.body.back_date, req.body.passenger_adult, req.body.passenger_children, req.body.class, req.body.type]
        );
 
        ress.json('ok')
    }catch(e){
        console.log(e)
        ress.json("error: " + e)

    }
})

app.delete("/delete", async (req, res) => {
    try{
      
        const result = await pool.query('DELETE FROM ticket WHERE id = $1', [req.body.id])
        res.json('ok')
    }catch(e){
        console.log(e)
        res.json('error, :' + e)
    }
})

const PORT = process.env.PORT || 4000   ;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});