module.exports = async (client, serverId) => {
    let applicationCommands;

    if (serverId) {
        const guild = await client.guilds.fetch(serverId);
        applicationCommands = guild.commands;
    } else {
        applicationCommands = await client.application.commands;
    }

    await applicationCommands.fetch();
    return applicationCommands;
};