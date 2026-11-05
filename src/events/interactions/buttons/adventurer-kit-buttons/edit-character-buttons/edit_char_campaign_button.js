import { MessageFlags } from "discord.js";
import { createAddCampaignToCharacterComponent } from "../../../../components/adventurer-kit/edit-character-comps/add_campaign_to_char.js";


export default {
    customId: 'edit_character_campaign_button:', 
    type: 'button',
    async execute(interaction) {
        const characterId = interaction.customId.split(':')[1];
        const userId = interaction.user.id;
        const serverId = interaction.guild.id;

        try {

            const component = createAddCampaignToCharacterComponent(characterId, serverId);

            await interaction.update({
                components: [component],
                flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral]
            });

        } catch (err) {
            console.error('Error:', err);

            const message = '❌ Something went wrong. Please wait a moment and try again!';

            await interaction.update({
                    components: [
                        new TextDisplayBuilder()
                            .setContent(message)
                    ],
                    flags: [MessageFlags.Ephemeral]
                });
        }
    }
};