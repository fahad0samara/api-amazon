const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

app.set('port', process.env.port || 3000)

app.get('/', (req, res, next) => {
    res.send('<h1>Hello world<h1>');
})

app.get('/news', (req, res, next) => {
    axios('https://www.amazon.com').then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);
            const data = []
            $('.a-section grid-row-1', html).each(function() {
                data.push($(this).text())
            })

            dataBuffer = {
                text: $('a-section grid-row-1').text(),
                textContent: data
            }
            res.json(dataBuffer)
        })
        .catch((error) => {
            console.log(error)
        })

})
app.get('/data', (req, res, next) => {
    axios('https://rapidapi.com/apidojo/api/asos2/').then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        const data = $('.ProductInfo ')
        const dataBuffer = data.find('div').text()
        console.log(data.text(), 'ffff');
        console.log(dataBuffer, 'bbbb');
        res.json(dataBuffer)

    }).catch((error) => {
        console.log(error)
    })

})

app.listen(app.get('port'), server => {
    console.info(`Server listen on port ${app.get('port')}`);
})