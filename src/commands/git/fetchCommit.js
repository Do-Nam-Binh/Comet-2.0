const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fetchcommit')
        .setDescription('Fetch the latest commit from a GitHub repository')
        .addStringOption(option => 
            option.setName('owner')
                .setDescription('Owner of the GitHub repository')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('repo')
                .setDescription('Name of the GitHub repository')
                .setRequired(true)),
    
    async execute(interaction) {
        const owner = interaction.options.getString('owner');
        const repo = interaction.options.getString('repo');
        
        try {
            // Fetch the latest commits from the specified GitHub repository
            const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`);
            const commits = response.data;

            if (!commits || commits.length === 0) {
                await interaction.reply('No commits found.');
                return;
            }

            const commitMessage = commits[0].commit.message;
            const commitUrl = commits[0].html_url;
            const commitAuthor = commits[0].commit.author.name;

            // Prepare the message for Discord
            const discordMessage = `**New commit by ${commitAuthor}:**\n${commitMessage}\n[View Commit](${commitUrl})`;

            // Send the message in response to the interaction
            await interaction.reply(discordMessage);
            console.log('New commit message sent to Discord.');
        } catch (error) {
            console.error('Error fetching commits from GitHub:', error);
            await interaction.reply('Failed to fetch commits.');
        }
    },
};
