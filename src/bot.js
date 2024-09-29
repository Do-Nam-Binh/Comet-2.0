const { Client, GatewayIntentBits, REST, Routes } = require("discord.js");
const { token, botId, serverId } = require("./config.json"); 
const eventHandler = require('./handlers/eventHandler');
const fs = require('fs');
const path = require('path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

eventHandler(client);

client.login(token);