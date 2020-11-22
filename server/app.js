const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.port;
const host = process.env.host;
const bodyParser = require("body-parser"); //use to parse incoming request bodies
 
 
const urlServices = require("./services/urlServices");
const db = require("./data-access/db");
const urlDb = require("./data-access/urlDb");
 
const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
}
 
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/url", async (req, res) => {
    try {
        if (!!urlServices.validateUrl(req.body.url))
            return res.status(400).send({ msg: "Invalid URL." });
 
        const urlKey = urlServices.generateUrlKey();
        const shortUrl = `http://${host}:${port}/${urlKey}`
 
        await urlDb.save(req.body.url, shortUrl, urlKey)
        return res.status(200).send({ shortUrl });
 
    } catch (error) {
        return res.status(500).send({ msg: "Something went wrong. Please try again." });
    }
});

app.get("/:shortUrlId", async (req, res) => {
    try {
        const url = await urlDb.find(req.params.shortUrlId);
        return !url ? res.status(404).send("Not found") : res.redirect(301, url.longURL)
 
    } catch (error) {
        return res.status(500).send("Something went wrong. Please try again.")
    }
});
 
app.listen(port, () => console.log("listening port " + port));