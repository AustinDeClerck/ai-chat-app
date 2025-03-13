const express = require('express');
const router = express.Router();
const openai = require('openai');

openai.apiKey = process.env.OPENAI_API_KEY;

router.post('/chat', async (req, res) => {
    const { message } = req.body;
    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            prompt: message,
            max_tokens: 150,
        });
        res.json(response.data.choices[0].message);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

module.exports = router;