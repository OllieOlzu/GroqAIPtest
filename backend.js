// backend.js
const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');

const app = express();
const port = 3000;

// PASTE YOUR GROQ API KEY HERE
const groq = new Groq({ apiKey: "Hehe" });

// Middleware
app.use(cors()); // Allows the frontend to talk to this backend
app.use(express.json());

app.post('/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;

        const chatCompletion = await groq.chat.completions.create({
            "messages": [
                {
                    "role": "system",
                    "content": "You are a helpful AI assistant."
                },
                {
                    "role": "user",
                    "content": userMessage
                }
            ],
            "model": "llama-3.1-8b-instant",
            "temperature": 0,
            "seed": 0,
            "max_tokens": 1024,
            "top_p": 1,
            "stream": false,
            "stop": null
        });

        // Send the AI's response back to the frontend
        res.json({ response: chatCompletion.choices[0].message.content });
        console.log(chatCompletion)

    } catch (error) {
        console.error("Error communicating with Groq:", error);
        res.status(500).json({ error: "Failed to fetch response from Groq." });
    }
});

app.listen(port, () => {
    console.log(`Backend running at http://localhost:${port}`);
});
