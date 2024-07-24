const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5002;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

// health data
app.get('/api/health-data', async (req, res) => {
    const healthData = [
        {
            timestamp: '2024-07-15T08:55:00Z',
            heartRate: 72,
            steps: 10000,
            caloriesBurned: 500,
            oxygenLevel: 98
        }
    ];
    res.json(healthData);
});

//  interact with openai API
app.post('/api/recommendations', async (req, res) => {
    const { prompt } = req.body;
    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: "gpt-3.5-turbo-instruct",
            prompt: prompt,
            max_tokens: 100
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error interacting with OpenAI API:', error.response ? error.response.data : error.message);
        res.status(500).json({ 
            error: 'Error generating recommendations', 
            details: error.response ? error.response.data : error.message 
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});