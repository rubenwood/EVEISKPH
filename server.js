const express = require('express');
const axios = require('axios');
require('dotenv').config();
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());


// Function to delay execution by a specified time (in milliseconds)
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Get all systems, only need to do this once (must run before 11am)
app.get('/api/getSystemsIdName', async (req, res) => {
    try {
        // Make an initial API call to get all system IDs
        const response = await axios.get('https://esi.evetech.net/latest/universe/systems/');
        const systemIds = response.data;

        // Create an array to store the results (system names paired with their IDs)
        const systemIDsAndNames = [];

        // Use Promise.all to concurrently fetch system names for all system IDs
        const promises = systemIds.map(async (systemId) => {
            const systemResponse = await axios.get(`https://esi.evetech.net/latest/universe/systems/${systemId}/`);
            await delay(1000);
            const systemName = systemResponse.data.name;
            systemIDsAndNames.push({ id: systemId, name: systemName });
        });

        await Promise.all(promises);
        
        // save systemIDsAndNames as CSV
        // Write systemNames to a CSV file
        const csvData = systemIDsAndNames.map((system) => `${system.id},${system.name}`).join('\n');
        const filePath = path.join('csv/', 'systemIDsAndNames.csv');
        
        fs.writeFileSync(filePath, csvData);

        // Send the system names as JSON response
        res.json(systemIDsAndNames);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Get system by name (search in csv)

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
