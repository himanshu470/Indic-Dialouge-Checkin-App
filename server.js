const express = require('express');
const cors = require('cors'); // Import the cors module
const fs = require('fs');
const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Endpoint to handle data update
app.post('/update-data', (req, res) => {
    const newData = req.body;

    // Read existing data from new.json
    fs.readFile('new.json', 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        let existingData = [];
        if (data) {
            existingData = JSON.parse(data);
        }

        // Append new data to existing data
        existingData.push(...newData);

        // Write updated data back to new.json
        fs.writeFile('new.json', JSON.stringify(existingData), 'utf8', (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            console.log('Data updated successfully');
            res.json({ success: true });
        });
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
