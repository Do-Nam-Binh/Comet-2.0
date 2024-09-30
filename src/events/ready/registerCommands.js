const { serverId } = require("../../config.json");
const areCommandsDifferent = require("../../utils/areCommandsDifferent");
const getApplicationCommands = require("../../utils/getApplicationCommands");
const getLocalCommands = require("../../utils/getLocalCommands");
const { logSuccess, logError, logInfo } = require('../../utils/logger'); 

module.exports = async (client) => {
    try {
        const localCommands = getLocalCommands();
        const applicationCommands = await getApplicationCommands(
            client,
            serverId
        );

        for (const localCommand of localCommands) {
            const { name, description, options } = localCommand;

            const existingCommand = await applicationCommands.cache.find(
                (cmd) => cmd.name === name
            );

            if (existingCommand) {
                if (localCommand.deleted) {
                    await applicationCommands.delete(existingCommand.id);
                    let message = `Deleted command "${name}".`;
                    logError(message,'🗑');
                    continue;
                }

                if (areCommandsDifferent(existingCommand, localCommand)) {
                    await applicationCommands.edit(existingCommand.id, {
                        description,
                        options,
                    });

                    let message = `Edited command "${name}".`;
                    logInfo(message,'🔁');
                }
            } else {
                if (localCommand.deleted) {
                    let message = `Skipping registering command "${name}" as it's set to delete.`;
                    logInfo(message,'⏩');
                    continue;
                }

                await applicationCommands.create({
                    name,
                    description,
                    options,
                });
                
                let message = `Registered command "${name}."`;
                logSuccess(message,'👍');
            }
        }
        
    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
};