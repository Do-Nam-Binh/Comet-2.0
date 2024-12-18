const { Client, GatewayIntentBits } = require("discord.js");
const { token, mongoUri } = require("./config.json");
const eventHandler = require("./handlers/eventHandler");
const mongoose = require("mongoose");
const { logStartup, logSuccess, logError } = require("./utils/logger");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

(async () => {
  logStartup();

  try {
    await eventHandler(client);
    logSuccess("Successfully load all events and commands");

    mongoose.set("strictQuery", false);
    await mongoose.connect(mongoUri);
    logSuccess("Successfully connected to MongoDB");

    client.login(token);
  } catch (error) {
    logError(`Error: ${error}`);
  }
})();
