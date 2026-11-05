import { ActionRowBuilder, MessageFlags } from "discord.js";
import { createFirstStatsComponent } from "../../../../components/adventurer-kit/edit-character-comps/first_stats_group.js";
import { createBackButton } from "../../../../../helpers/creat_back_button.js";
import { createSubmitButton } from "../../../../../helpers/create_submit_button.js";


export default {
    customId: 'character_ability_scores_edit:', 
    type: 'button',
    async execute(interaction) {
        const characterId = interaction.customId.split(':')[1];
        const userId = interaction.user.id;
        const pageId = 1;

        try {

            const component = createFirstStatsComponent(userId, characterId);
            const row = new ActionRowBuilder()
                .addComponents(createBackButton(pageId), createSubmitButton(pageId));
            
            component.addActionRowComponents(row);

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