const { Client, GatewayIntentBits } = require("discord.js");
const { token, mongoUri } = require("./config.json"); 
const eventHandler = require('./handlers/eventHandler');
const mongoose = require('mongoose');
const { logStartup, logSuccess, logError } = require('./utils/logger');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

logStartup();

try {
    eventHandler(client);
    logSuccess("Successfully load all events and commands");
} catch (error) {
    logError(`Error: ${error}`);
}

client.login(token);