import { TextDisplayBuilder } from "discord.js";
import { addCampaignToDB } from "../../../data/db-commands/campaign_db_commands.js";

export default {
    customId: 'add_campaign_modal', 
    type: 'modal',
    async execute(interaction) {
        const userId = interaction.user.id;
        const nameInput = interaction.fields.getTextInputValue('campaign_name_input');
        const premiseInput = interaction.fields.getTextInputValue('campaign_premise_input');
        const dateCreated = Date.now();

            try {      

                await addCampaignToDB(nameInput,premiseInput,dateCreated,userId);

                const confirmationMessage = `✅ Successfully added ${nameInput} to the database!`

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