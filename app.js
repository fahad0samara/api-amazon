const express = require('express');
const app = express();
const request = require('request-promise');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const apikey = 'e4037415b3d58b93e689d4ed83405ffb'
const baseurl = `http://api.scraperapi.com?api_key=${apikey}&autoparse=true`

app.set('port', process.env.port || 3000)
app.use(express.json())
app.get('/', (req, res, next) => {
    res.send('<h1>Hello world<h1>');
})

app.get('/products/:productId', async(req, res, next) => {
    const { productId } = req.params;
    try {
        const response = await request(`${baseurl}&url=https://www.amazon.com/dp/${productId}`);
        res.json(JSON.parse(response));

    } catch (error) {
        res.json(error)
    }
})

app.get('/products/:productId/reviews', async(req, res, next) => {
    const { productId } = req.params;
    try {
        const response = await request(`${baseurl}&url=https://www.amazon.com/product-reviews/${productId}`);
        res.json(JSON.parse(response));

    } catch (error) {
        res.json(error)
    }
})
app.get('/search/:searchid', async(req, res, next) => {
    const { searchid } = req.params;
    try {
        const response = await request(`${baseurl}&url=https://www.amazon.com/s?k=/${searchid}`);
        res.json(JSON.parse(response));

    } catch (error) {
        res.json(error)
    }
})





app.listen(server => {
    console.info(`
Server listen on port $ { app.get('port') }
`);
})