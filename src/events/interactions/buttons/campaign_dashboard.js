import { MessageFlags } from "discord.js";
import {
    campaignsEmbed,
    campaignsButtons
    // container
} from '../menus/DMDashboard.js';

export default {
    customId: 'campaign_dashboard', 
    type: 'button',
    async execute(interaction) {
        const eventId = interaction.customId.split(':')[1];
        const userId = interaction.user.id;
        const channel = interaction.channel

        try {
            // reply with a new ephemeral menu here, then use interaction.update to change that ephemeral message client sided
                await interaction.reply({
                    embeds: [campaignsEmbed],
                    components: [campaignsButtons],
                    flags: MessageFlags.Ephemeral
                });
                // await channel.send({
                //     components: [container],
                //     flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral]
                // });
        } catch (err) {
            console.error('Error:', err);
            await interaction.reply({
                content: '❌ Something went wrong. Please wait a moment and try again!',
                flags: MessageFlags.Ephemeral,
            });
        }
    }
};