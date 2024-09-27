const {Client, IntentsBitField} = require("discord.js");
const {token} = require("./config.json");

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

client.on('ready', (client) => {
    console.log(`✅ ${client.user.displayName} is online ✅`);
})

client.on('messageCreate', (message) => {
    if (message.author.bot) {
        return;
    } 
    
    if (message.content === "Comet") {
        message.reply('Hey, ask me anything!')
    }
    console.log(`${message.author.username}: ${message.content}`);
})

client.login(token);



