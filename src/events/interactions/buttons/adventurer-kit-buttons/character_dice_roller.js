import { MessageFlags } from "discord.js";


export default {
    customId: 'character_dice_roller', 
    type: 'button',
    async execute(interaction) {

        try {
            // await interaction.showModal(createDiceRollerModal());
        } catch (err) {
            console.error('Error:', err);
            await interaction.reply({
                content: '❌ Something went wrong. Please wait a moment and try again!',
                flags: MessageFlags.Ephemeral
            });
        }
    }
};