import { MessageFlags } from "discord.js";
import { addCampaignToDB } from "../../../data/db-commands/campaign_db_commands.js";

export default {
    customId: 'add_campaign_modal', 
    type: 'modal',
    async execute(interaction) {
        const userId = interaction.user.id;
        const nameInput = interaction.fields.getTextInputValue('campaign_name_input');
        const premiseInput = interaction.fields.getTextInputValue('campaign_premise_input');
        const dateCreated = Date.now()

        await interaction.deferReply({ flags: MessageFlags.Ephemeral });

            try {      

                await addCampaignToDB(nameInput,premiseInput,dateCreated,userId)

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