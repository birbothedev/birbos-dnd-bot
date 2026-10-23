import { MessageFlags } from "discord.js";
import { getActiveCharactersByUserID } from "../../../../data/db-commands/character_db_commands.js";
import { createActivityStatusComponent } from "../../../components/adventurer-kit/character_active_status.js";

export default {
    customId: 'reactivate_inactive_characters', 
    type: 'button',
    async execute(interaction) {
        const userId = interaction.user.id;
        const inActiveCharacters = getActiveCharactersByUserID(userId, 0);

        try {
            const component = createActivityStatusComponent(false, inActiveCharacters);
            
            await interaction.reply({
                components: [component],
                flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral]
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