import { TextDisplayBuilder } from "discord.js";
import { getCharactersByUserID } from "../../../../data/db-commands/character_db_commands.js";
import { addSessionSignUpToDB, removeSessionSignUpFromDB } from "../../../../data/db-commands/sessions_db_commands.js";

export default {
    customId: 'session_reg_character_dropdown:', 
    async execute(interaction) {
        const isCanceling = interaction.customId.split(':')[1] === 'true';
        const campaignId = interaction.customId.split(':')[2];
        const date = interaction.customId.split(':')[3];
        const userId = interaction.user.id;
        const selectedCharacter = interaction.values[0];

            try {      

                // look up characters in db here
                const characters = getCharactersByUserID(userId);

                const character = characters.find(
                    char => char.id === Number(selectedCharacter)
                );


                // update db sign ups here
                if (!character) {
                    return await interaction.update({
                        components: [
                            new TextDisplayBuilder()
                                .setContent(confirmationMessage)
                        ]
                    });
                }

                const confirmationMessage = isCanceling
                    ? `You have canceled **${character.character_name}'s attendance**!`
                    : `You have signed up with **${character.character_name}**!`;
                
                if (isCanceling){
                    removeSessionSignUpFromDB(campaignId, character.id, date);
                } else {
                    addSessionSignUpToDB(campaignId, character.id, date);
                }

                await interaction.update({
                    components: [
                        new TextDisplayBuilder()
                            .setContent(confirmationMessage)
                    ]
                });
                
            } catch (error) {
                console.error("Dropdown select submit error: ", error);
                await interaction.update({
                    components: [
                        new TextDisplayBuilder()
                            .setContent('❌ Something went wrong. Please wait a moment and try again!')
                    ]
                });
            }
    }
};