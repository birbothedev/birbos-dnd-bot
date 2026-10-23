import { MessageFlags } from "discord.js";
import { createViewCharactersComponent } from "../../../components/adventurer-kit/view_characters.js";
import { getActiveCharactersByUserID } from "../../../../data/db-commands/character_db_commands.js";

export default {
    customId: 'characters_view', 
    type: 'button',
    async execute(interaction) {
        const userId = interaction.user.id;
        const activeCharacters = getActiveCharactersByUserID(userId, 1);
        const inactiveCharacters = getActiveCharactersByUserID(userId, 0);

        const component = createViewCharactersComponent(activeCharacters, inactiveCharacters);


        try {
            await interaction.update({
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