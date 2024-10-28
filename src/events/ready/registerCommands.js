const getApplicationCommands = require("../../utils/getApplicationCommands");
const getLocalCommands = require("../../utils/getLocalCommands");
const { logSuccess, logError, logInfo } = require('../../utils/logger');
const areCommandsDifferent = require('../../utils/areCommandsDifferent');

module.exports = async (client) => {
    try {
        const localCommands = getLocalCommands();
        const applicationCommandsByGuild = await getApplicationCommands(client);

        if (!applicationCommandsByGuild) {
            console.error("Application commands could not be fetched.");
            return;
        }

        for (const [guildId, applicationCommands] of Object.entries(applicationCommandsByGuild)) {
            const localCommandNames = localCommands.map(cmd => cmd.name);

            for (const localCommand of localCommands) {
                const { name, description, options, maintenance } = localCommand;

                if (maintenance === true) {
                    logInfo(`Skipping command "${name}" for guild ${guildId} as it's on maintenance.`, '⏩');
                    continue;
                }

                const existingCommand = applicationCommands.cache.find(
                    (cmd) => cmd.name === name
                );

                if (existingCommand) {
                    if (localCommand.deleted) {
                        await applicationCommands.delete(existingCommand.id);
                        logError(`Deleted command "${name}" for guild ${guildId}`, '🗑');
                        continue;
                    }

                    if (areCommandsDifferent(existingCommand, localCommand)) {
                        await applicationCommands.edit(existingCommand.id, {
                            description,
                            options,
                        });
                        logInfo(`Edited command "${name}" for guild ${guildId}`, '🔁');
                    }
                } else {
                    await applicationCommands.create({
                        name,
                        description,
                        options,
                    });
                    logSuccess(`Registered command "${name}" for guild ${guildId}`, '👍');
                }
            }

            for (const cmd of applicationCommands.cache.values()) {
                if (!localCommandNames.includes(cmd.name)) {
                    await applicationCommands.delete(cmd.id);
                    logInfo(`Deleted command "${cmd.name}" from guild ${guildId} as it no longer exists locally.`, '🗑');
                }
            }
        }
        
    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
};
