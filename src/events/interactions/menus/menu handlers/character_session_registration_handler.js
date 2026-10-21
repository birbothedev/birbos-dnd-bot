import { MessageFlags } from "discord.js";

export default {
    customId: 'session_reg_character_dropdown', 
    async execute(interaction) {
        const eventId = interaction.customId;
        const userId = interaction.user.id;
        const characterSelected = interaction.values[0];

        await interaction.deferReply({ flags: MessageFlags.Ephemeral });

            try {      

                // look up characters in db here
                const characters = [
                    {
                        name: 'character 1',
                        desc: 'this is the character',
                        value: '1'
                    },
                    {
                        name: 'character 2',
                        desc: 'this is the character',
                        value: '2'
                    }
                ];

                const selectedCharacter = characters.find(
                    char => char.value === interaction.values[0]
                );

                // update db sign ups here
                if (!selectedCharacter) {
                    return interaction.editReply({
                        content: 'Character not found.'
                    });
                }

                await interaction.editReply({
                    content: `You selected **${selectedCharacter.name}**!`
                });
                
            } catch (error) {
                console.error("Modal submit error: ", error);
                await interaction.editReply({
                    content: '❌ Something went wrong. Please wait a moment and try again!'
                });
            }
    }
};