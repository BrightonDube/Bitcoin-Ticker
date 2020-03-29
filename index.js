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
    let url = `https://apiv2.bitcoinaverage.com/indices/global/ticker/${crypto}${fiat}`;
    
    (async () => {
        try {
            const response = await got(url);                                 
            let last = JSON.parse(response.body).last;
            
            res.send(`<h1>The price is:  ${last}</h1>`);
            
        } catch (error) {
            console.log(error.response.body);           
            
        }
    })();

    // res.end();
   
});

app.listen(5500, ()=>{
    console.log("Server listening on port 5500");
});