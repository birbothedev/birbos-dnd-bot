import { MessageFlags } from "discord.js";

export default {
    customId: 'session_attendees_button', 
    type: 'button',
    async execute(interaction) {


        //TODO fetch attending users from db
        const users = `Mateo, Katharine, Sebastian`;

        try {

            await interaction.reply({
                content: `Users attending the session: **${users}**`,
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