import { MessageFlags } from "discord.js";
import { updateCharacterAbilityScoresInDB } from "../../../../data/db-commands/character_db_commands.js";

export default {
    customId: 'edit_ability_scores_modal:', 
    type: 'modal',
    async execute(interaction) {
        const characterId = interaction.customId.split(':')[1];
        const userId = interaction.user.id;
        const strInput = interaction.fields.getTextInputValue('character_str_input');
        const dexInput = interaction.fields.getTextInputValue('character_dex_input');
        const conInput = interaction.fields.getTextInputValue('character_con_input');
        const intInput = interaction.fields.getTextInputValue('character_int_input');
        const wisInput = interaction.fields.getTextInputValue('character_wis_input');
        // const chaInput = interaction.fields.getTextInputValue('character_cha_input');

        await interaction.deferReply({ flags: MessageFlags.Ephemeral });

            try {      

                updateCharacterAbilityScoresInDB(characterId,userId,strInput,dexInput,conInput,intInput,wisInput)

                await interaction.editReply({
                    content: `✅ Successfully added scores to the database! Dismiss the interaction and reload your character to see the changes reflected.`
                });
                
            } catch (error) {
                console.error("Modal submit error: ", error);

                await interaction.editReply({
                    content: '❌ Something went wrong. Please wait a moment and try again!'
                });
            }
    }
};