import { MessageFlags, TextDisplayBuilder } from "discord.js";
import {  getCampaignsInServerList } from "../../../../data/db-commands/campaign_db_commands.js";
import { updateCampaignForCharacter } from "../../../../data/db-commands/character_db_commands.js";

export default {
    customId: 'character_campaign_dropdown:', 
    async execute(interaction) {
        const userId = interaction.user.id;
        const characterId = interaction.customId.split(':')[1];
        const campaignSelected = interaction.values[0];
        const serverId = interaction.guild.id;

            try {      

                // look up characters in db
                const campaigns = getCampaignsInServerList(1, serverId)

                const selectedCampaign = campaigns.find(
                    camp => camp.id === Number(campaignSelected)
                );

                // if no matching character found
                if (!selectedCampaign) {
                    return interaction.update({
                        content: 'Campaign not found.'
                    });
                }

                updateCampaignForCharacter(campaignSelected, userId, characterId);

                const confirmationMessage = `✅ Successfully added **${selectedCampaign.name}** to the character sheet!`

                await interaction.update({
                    components: [
                        new TextDisplayBuilder()
                            .setContent(confirmationMessage)
                    ]
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