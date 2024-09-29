module.exports = {
    name: 'hey',
    description: 'Replies with Hmm?',

    callback: (client, interaction) => {
        interaction.reply("Hmm?");
    },
};