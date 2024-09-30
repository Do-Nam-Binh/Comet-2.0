const { Client, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json"); 
const eventHandler = require('./handlers/eventHandler');

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