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

app.post("/send-group", async (req, res) => {
    const { groupId, message } = req.body;

    if (!groupId || !message) {
        return res.status(400).json({ error: "Missing groupId or message" });
    }

    // Ensure groupId has WhatsApp group format
    const chatId = groupId.includes("@g.us") ? groupId : `${groupId}@g.us`;

    try {
        await client.sendMessage(chatId, message);
        res.status(200).json({ status: "success", to: groupId });
    } catch (err) {
        console.error("Failed to send message to group:", err);
        res.status(500).json({ error: "Failed to send message to group" });
    }
});

app.get('/groups', async (req, res) => {
    const chats = await client.getChats();
    const groups = chats.filter(chat => chat.isGroup);
    
    const result = groups.map(group => ({
        name: group.name,
        id: group.id._serialized
    }));

    res.json(result);
});

app.get('/status', (req, res) => {
    const ready = client.isClientReady ? client.isClientReady() : false;
    res.json({ whatsapp: ready ? 'ready' : 'not_ready' });
});

module.exports = app;
