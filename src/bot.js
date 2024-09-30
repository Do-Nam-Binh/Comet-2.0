const { Client, GatewayIntentBits } = require("discord.js");
const { token,mongoUri } = require("./config.json"); 
const eventHandler = require('./handlers/eventHandler');
const mongoose = require('mongoose');
const { logStartup, logSuccess, logError, logReady } = require('./utils/logger');
const registerCommands = require('./events/ready/registerCommands'); 

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

(async () => {
    logStartup();

    try {    
        mongoose.set('strictQuery',false);
        await mongoose.connect(mongoUri);
        logSuccess("Successfully connected to MongoDB");

        eventHandler(client);
        logSuccess("Successfully load all events and commands");
        
    } catch (error) {
        logError(`Error: ${error}`);
    }
})();

client.login(token);