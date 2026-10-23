import { MessageFlags } from "discord.js";
import { deleteCharacterFromDB, getCharacterByCharacterID } from "../../../data/db-commands/character_db_commands.js";

export default {
    customId: 'delete_character_modal:', 
    type: 'modal',
    async execute(interaction) {
        const characterId = interaction.customId.split(':')[1];
        const userId = interaction.user.id;
        const characterInput = interaction.fields.getTextInputValue('delete_character_name');
        const deleteConfirmation = interaction.fields.getCheckboxGroup('delete_confirmation')[0];


        await interaction.deferReply({ flags: MessageFlags.Ephemeral });

        const character = getCharacterByCharacterID(characterId, userId)

        if (deleteConfirmation === 'confirm' && character.character_name === characterInput){

            try {       
                deleteCharacterFromDB(characterId, userId);
                await interaction.editReply({
                    content: "✅ Successfully deleted character from the database."
                });
                
            } catch (error) {
                console.error("Modal submit error: ", error);

                await interaction.editReply({
                    content: '❌ Something went wrong. Please wait a moment and try again!'
                });
            }

        } else {
            interaction.editReply({
                content: `⚠️ Character not deleted. Please be sure to fill out all required fields and to write the name exactly how it is listed.`
            });
        }
    }
};
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        //TODO add character id to button id to verify what character is being deleted