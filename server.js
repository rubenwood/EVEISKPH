const express = require('express');
const axios = require('axios');
require('dotenv').config();
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Function to delay execution by a specified time (in milliseconds)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Get all systems, only need to do this once (must run before 11am)
app.get('/api/getSystemIds', async (req, res) => {
    try {
        // Make an initial API call to get all system IDs
        const response = await axios.get('https://esi.evetech.net/latest/universe/systems/');
        const systemIds = response.data;
        console.log(systemIds);

        // Be careful, if this takes too long to write we will time out
        const jsonFilePathSystemIds = path.join(__dirname, 'json_resp', 'systemIds.json');
        fs.writeFileSync(jsonFilePathSystemIds, JSON.stringify(systemIds, null, 2), 'utf-8');

        res.json(systemIds);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all systems, only need to do this once (must run before 11am)
app.post('/api/getSystemDetails', async (req, res) => {
    try {
        console.log(req.body);
        const systemDetailsResponse = await axios.get(`https://esi.evetech.net/latest/universe/systems/${req.body.systemId}/`);
        let systemDetails = systemDetailsResponse.data;
        console.log(systemDetails);

        //const jsonFilePathSystemDetails = path.join(__dirname, 'json_resp', 'systemDetails.json');
        //fs.writeFileSync(jsonFilePathSystemDetails, JSON.stringify(systemDetails, null, 2), 'utf-8');

        res.json(systemDetails);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get system by name (search in json)

// Get main markets, Jita, Rens, Hek
// https://www.adam4eve.eu/
// Jita - 30000142
// Rens - 30002510
// Hek - 30002053

// Get player wallet (requires authentication)

const PORT = process.env.PORT;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
