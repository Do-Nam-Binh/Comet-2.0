module.exports = {
    execute(message) {
        if (message.author.bot) return;

        if (message.content === "Comet") {
            message.reply('Hey, ask me anything!');
        }

        console.log(`${message.author.username}: ${message.content}`);
    },
};