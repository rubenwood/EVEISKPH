const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(cors());


const PORT = process.env.PORT;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
