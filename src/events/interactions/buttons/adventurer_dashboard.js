import { MessageFlags } from "discord.js";
import {
    adventurerEmbed,
    adventurerButtons
} from '../menus/AdventurerDashboard.js';

export default {
    customId: 'adventurers_tools', 
    type: 'button',
    async execute(interaction) {
        const eventId = interaction.customId.split(':')[1];
        const userId = interaction.user.id;

        try {
            // reply with a new ephemeral menu here, then use interaction.update to change that ephemeral message client sided
            await interaction.reply({
                embeds: [adventurerEmbed],
                components: [adventurerButtons],
                flags: MessageFlags.Ephemeral
            });
        } catch (err) {
            console.error('Error:', err);
            await interaction.reply({
                content: '❌ Something went wrong. Please wait a moment and try again!',
                flags: MessageFlags.Ephemeral
            });
        }
    }
};