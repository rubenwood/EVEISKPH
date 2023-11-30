const express = require('express');
const axios = require('axios');
require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(cors());


// Get all systems
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
            const systemName = systemResponse.data.name;
            systemIDsAndNames.push({ id: systemId, name: systemName });
        });

        await Promise.all(promises);

        // Send the system names as JSON response
        res.json(systemIDsAndNames);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// log system ID:name

// get system by name

// get main markets, Jita, Rens, Hek


const PORT = process.env.PORT;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
