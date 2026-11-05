import { TextDisplayBuilder } from "discord.js";
import { addCharacterToDB } from "../../../data/db-commands/character_db_commands.js";

export default {
    customId: 'add_character_modal', 
    type: 'modal',
    async execute(interaction) {
        const userId = interaction.user.id;
        const username = interaction.user.username;
        // const campaignSelect = interaction.fields.getStringSelectValues('character_campaign_input');
        const nameInput = interaction.fields.getTextInputValue('character_name_input');
        const classSelect = interaction.fields.getStringSelectValues('character_class_input');
        const raceInput = interaction.fields.getTextInputValue('race_input');
        const backstoryInput = interaction.fields.getTextInputValue('character_backstory_input');
        const totalLevel = interaction.fields.getStringSelectValues('character_level_input');

        const capitalizedClass = classSelect[0].toUpperCase() + classSelect.slice(1);

            try {      

                addCharacterToDB(totalLevel,userId,username,nameInput,capitalizedClass,raceInput,backstoryInput);

                const confirmationMessage = `✅ Successfully added **${nameInput}** to the database!`

                await interaction.update({
                    components: [
                        new TextDisplayBuilder()
                            .setContent(confirmationMessage)
                    ]
                });
                
            } catch (error) {
                console.error("Modal submit error: ", error);

                await interaction.update({
                    components: [
                        new TextDisplayBuilder()
                            .setContent('❌ Something went wrong. Please wait a moment and try again!')
                    ]
                });
            }
    }
};