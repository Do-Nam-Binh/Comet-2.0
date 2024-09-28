module.exports = {
    name: 'ready', 
    execute(client) {
        console.log(`✅ ${client.user.displayName} is online ✅`);
    },
};