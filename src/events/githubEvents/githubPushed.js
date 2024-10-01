const express = require('express');
const { MessageEmbed } = require('discord.js');
const { serverId } = require('./config.json');

const app = express();

module.exports = async (client) => {
    // Middleware to parse incoming webhook requests
    app.use(express.json());

    app.post('/github-webhook', (req, res) => {
        const event = req.headers['x-github-event'];

        try {
            // Create an embed message for Discord
            const embed = new MessageEmbed()
                .setTitle('GitHub Notification')
                .setDescription(`Received event: ${event}`)
                .setColor('#0099ff');

            // Send embed to the specified Discord channel using the existing logged-in client
            client.channels.cache.get(serverId).send({ embeds: [embed] });
            
            res.status(200).send('Event processed');
        } catch (error) {
            console.error(`Error processing event: ${error}`);
            res.status(500).send('Internal server error');
        }
    });

    // Start the webhook server
    app.listen(3000, () => {
        console.log('Webhook server listening on port 3000');
    });
};

