import { MessageFlags } from "discord.js";
import { addCharacterToDB } from "../../../data/db-commands/character_db_commands.js";

export default {
    customId: 'add_character_modal', 
    type: 'modal',
    async execute(interaction) {
        const userId = interaction.user.id;
        const username = interaction.user.username;
        const campaignSelect = interaction.fields.getStringSelectValues('character_campaign_input');
        const nameInput = interaction.fields.getTextInputValue('character_name_input');
        const classSelect = interaction.fields.getStringSelectValues('character_class_input');
        const raceInput = interaction.fields.getTextInputValue('race_input');
        const backstoryInput = interaction.fields.getTextInputValue('character_backstory_input');

        const capitalizedClass = classSelect[0].toUpperCase() + classSelect.slice(1);

            try {      

                addCharacterToDB(campaignSelect,userId,username,nameInput,capitalizedClass,raceInput,backstoryInput)

                await interaction.reply({
                    content: `✅ Successfully added ${nameInput} to the database! Dismiss the interaction and reload the toolkit to see the changes reflected.`,
                    flags: MessageFlags.Ephemeral
                });
                
            } catch (error) {
                console.error("Modal submit error: ", error);

                await interaction.reply({
                    content: '❌ Something went wrong. Please wait a moment and try again!',
                    flags: MessageFlags.Ephemeral
                });
            }
    }
};