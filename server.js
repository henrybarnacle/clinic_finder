const express = require('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', (req, res) => res.send('server runnning...'));

app.get('/lookupNPI/:npi', cors(), async (req, res) => {
    try {
        request(`https://npiregistry.cms.hhs.gov/api/?version=2.1&number=${req.params.npi}`, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            const parsedData = JSON.parse(response.body);
            res.send(parsedData);
        }
    }); 
            
        } catch (e) {
            res.status(500).json({
                message: e.message
            });
        }
    });

app.listen(process.env.PORT || 8080);