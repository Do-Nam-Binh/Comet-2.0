const axios = require("axios");
const { ApplicationCommandOptionType } = require("discord.js");
const { logInfo, logError } = require("../../utils/logger");

module.exports = {
  name: "fetch-commit",
  description: "Get latest commit",

  options: [
    {
      name: "owner",
      description: "The owner of the repo.",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
    {
      name: "repo",
      description: "The name of the GitHub repository.",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],

  callback: async (client, interaction) => {
    const owner = interaction.options.getString("owner");
    const repo = interaction.options.getString("repo");

    try {
      // Fetch the latest commits from the specified GitHub repository
      const response = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/commits`
      );
      const commits = response.data;

      if (!commits || commits.length === 0) {
        await interaction.reply("No commits found.");
        return;
      }

      const commitMessage = commits[0].commit.message;
      const commitUrl = commits[0].html_url;
      const commitAuthor = commits[0].commit.author.name;

      // Prepare the message for Discord
      const discordMessage = `**New commit by ${commitAuthor}:**\n${commitMessage}\n[View Commit](${commitUrl})`;

      // Send the message in response to the interaction
      await interaction.reply(discordMessage);
      logInfo("New commit message sent to Discord.");
    } catch (error) {
      logError(`Error fetching commits from GitHub: ${error}`);
      await interaction.reply("Failed to fetch commits.");
    }
  },
};
