//jshint esversion: 6
//jshint esversion: 8

const express = require("express");
const app = express();
const got = require("got");

app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.get("/", (req, res, next)=>{
    res.sendFile(`${__dirname}/index.html`);
});

app.post("/",(req, res)=>{
    let crypto = req.body.crypto;
    let fiat = req.body.fiat;
    let url = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD';
    let url2 = `https://apiv2.bitcoinaverage.com/indices/global/ticker/${crypto}${fiat}`;
    (async () => {
        try {
            const response = await got(url2);
            console.log(response.body);
            //=> '<!doctype html> ...'
        } catch (error) {
            console.log(error.response.body);
            //=> 'Internal server error ...'
        }
    })();
    console.log(url === url2);
});

app.listen(5500, ()=>{
    console.log("Server listening on port 5500");
});