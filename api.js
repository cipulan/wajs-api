// api.js
require("dotenv").config();
const express = require("express");
const client = require("./client");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const app = express();
const swaggerDocument = YAML.load("./swagger.yaml");

const API_KEY = process.env.API_KEY;

app.use(express.json());

// Swagger docs route
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API key middleware
app.use((req, res, next) => {
    const apiKey = req.headers["x-api-key"];
    if (apiKey !== API_KEY) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    next();
});

app.post("/send", async (req, res) => {
    const { number, message } = req.body;

    if (!number || !message) {
        return res.status(400).json({ error: "Missing number or message" });
    }

    // Ensure number has WhatsApp format
    const chatId = number.includes("@c.us") ? number : `${number}@c.us`;

    try {
        await client.sendMessage(chatId, message);
        res.status(200).json({ status: "success", to: number });
    } catch (err) {
        console.error("Failed to send message:", err);
        res.status(500).json({ error: "Failed to send message" });
    }
});

module.exports = app;
