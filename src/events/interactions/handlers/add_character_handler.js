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

        await interaction.deferReply({ flags: MessageFlags.Ephemeral });

            try {      

                await addCharacterToDB(campaignSelect,userId,username,nameInput,classSelect,raceInput,backstoryInput)

                await interaction.editReply({
                    content: `✅ Successfully added ${nameInput} to the database!`,
                    ephemeral: true
                });
                
            } catch (error) {
                console.error("Modal submit error: ", error);

                await interaction.editReply({
                    content: '❌ Something went wrong. Please wait a moment and try again!',
                    ephemeral: true
                });
            }
    }
};