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
    let amt = Number(req.body.amt);    
    let url = `https://apiv2.bitcoinaverage.com/indices/global/ticker/${crypto}${fiat}`;
    
    // (async () => {
    //     try {
            //const response = await got(url); 
            let data = JSON.parse({
                "ask": 6280.68,
                "bid": 6276.18,
                "last": 6277.58,
                "high": 6334.22,
                "low": 5881.12,
                "volume": 83642.60385446,
                "open": {
                "hour": 6275.57,
                "day": 5890.15,
                "week": 5909.33,
                "month": 8698.65,
                "month_3": 7313.96,
                "month_6": 8087.78,
                "year": 4101.67
                },
                "averages": {
                "day": 6083.32,
                "week": 6466.62,
                "month": 7008.66
                },
                "changes": {
                "price": {
                "hour": 2.01,
                "day": 387.42,
                "week": 368.25,
                "month": -2421.07,
                "month_3": -1036.38,
                "month_6": -1810.2,
                "year": 2175.91
                },
                "percent": {
                "hour": 0.03,
                "day": 6.58,
                "week": 6.23,
                "month": -27.83,
                "month_3": -14.17,
                "month_6": -22.38,
                "year": 53.05
                }
                },
                "volume_percent": 72.07,
                "timestamp": 1585557260,
                "display_timestamp": "2020-03-30 08:34:20",
                "display_symbol": "BTC-USD"
                });
            let last = data.last;
            let high = data.high;
            let date = data.display_timestamp;
            let ask = data.ask;            
            let cost = (ask*amt);
            console.log(cost, ask);
            //res.write makes it possible to send multiple data sets in one go
            res.write(`<p>Date: ${date}</p>`);
            res.write(`<h1>The current ${crypto} price is: ${fiat} ${last}</h1>`);
            res.write(`<h1>The highest ${crypto} price today was: ${fiat} ${high}</h1>`);
            //res.write(`<h1>The cost of ${amt} ${crypto} is ${fiat} ${cost}</h1>`)
            res.send();
            
        // } catch (error) {
        //     console.log("error.response.body");           
            
        // }
    //})();
      
});

app.listen(5500, ()=>{
    console.log("Server listening on port 5500");
});