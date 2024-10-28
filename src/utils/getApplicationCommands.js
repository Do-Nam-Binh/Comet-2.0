const { serverId } = require('../config.json');

module.exports = async (client) => {
    const applicationCommands = {};

    try {
        for (const id of serverId) {
            const guild = await client.guilds.fetch(id);

            applicationCommands[id] = guild.commands;
            await guild.commands.fetch(); 
        }

        return applicationCommands;
    } catch (error) {
        console.error(`Error fetching application commands: ${error}`);
        return null;
    }
};
