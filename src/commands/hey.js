const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hey')
        .setDescription('Replies with Hmm?'),
    async execute(interaction) {
        await interaction.reply("Hmm?");
    },
};