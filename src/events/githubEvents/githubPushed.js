const express = require('express');
const { MessageEmbed } = require('discord.js');
const { serverId } = require('./config.json');

const app = express();

module.exports = async (client) => {
    // Middleware to parse incoming webhook requests
    app.use(express.json());

    app.post('/github-webhook', async (req, res) => {
        const event = req.headers['x-github-event'];

        try {
            // Create an embed message for Discord
            const embed = new MessageEmbed()
                .setTitle('GitHub Notification')
                .setDescription(`Received event: ${event}`)
                .setColor('#0099ff');

            // Send embed to the specified Discord channel using the existing logged-in client
            const channel = client.channels.cache.get(serverId);

            if (!channel) {
                throw new Error('Channel not found');
            }

            await channel.send({ embeds: [embed] });

            // Return success message
            res.status(200).send('Event processed and message sent to Discord');
        } catch (error) {
            console.error(`Error processing event: ${error}`);
            
            // Return failure message
            res.status(500).send(`Failed to process event: ${error.message}`);
        }
    });

    // Start the webhook server
    app.listen(3000, () => {
        console.log('Webhook server listening on port 3000');
    });
};

