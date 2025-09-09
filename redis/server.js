const express = require('express')
const axios = require('axios')
const cors = require('cors')
const redisClient = require('./redisClient.js')

const DEFAULT_EXPIRATION = 3600
const app = express()
app.use(cors())

// Route with caching
app.get("/photos", async (req, res) => {
    const albumId = req.query.albumId;

    try {
        // 1. Check cache
        const cacheKey = `photos?albumId=${albumId}`;
        const cached = await redisClient.get(cacheKey);

        if (cached) {
            console.log("Serving from Redis cache");
            return res.json(JSON.parse(cached));
        }

        // 2. If not cached, fetch from API
        const { data } = await axios.get(
            'https://jsonplaceholder.typicode.com/photos',
            { params: { albumId } }
        );

        // 3. Save into Redis with expiration
        await redisClient.setEx(cacheKey, DEFAULT_EXPIRATION, JSON.stringify(data));

        console.log("Serving from API and storing in Redis");
        res.json(data);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.get("/photos/:id", async (req, res) => {
    try {
        const { data } = await axios.get(
            `https://jsonplaceholder.typicode.com/photos/${req.params.id}`
        )
        res.json(data)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
})

app.listen(3000, () => {
    console.log("Server listening on port 3000");
})
