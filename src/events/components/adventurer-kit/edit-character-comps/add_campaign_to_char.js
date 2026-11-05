import { ContainerBuilder, SeparatorBuilder, SeparatorSpacingSize, TextDisplayBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";
import { getCampaignsInServerList } from "../../../../data/db-commands/campaign_db_commands.js";

export function createAddCampaignToCharacterComponent(characterId, serverId){
    const addCampaignToCharacterComponent = new ContainerBuilder()
        .addTextDisplayComponents(
            new TextDisplayBuilder()
                .setContent(`## Add or Change Campaign\n\n`)
        )
        .addSeparatorComponents(
            new SeparatorBuilder()
                .setSpacing(SeparatorSpacingSize.Small)
            .setDivider(true)
        )

    const activeCampaignsInServer = getCampaignsInServerList(1, serverId);
    if(activeCampaignsInServer.length >= 1){
        const options = []
        for (const camp of activeCampaignsInServer){
            const op = new StringSelectMenuOptionBuilder()
                .setLabel(camp.name)
                .setValue(`${camp.id}`)
            
            options.push(op)
        }
        const dropdown = new StringSelectMenuBuilder()
            .setCustomId(`character_campaign_dropdown:${characterId}`)
            .setPlaceholder('Select a campaign...')
            .addOptions(options)
        
        addCampaignToCharacterComponent.addTextDisplayComponents(
            new TextDisplayBuilder().setContent(
                `📝 Select a Campaign from the dropdown below to add a campaign or change your character's existing campaign.`
            )
        );

        addCampaignToCharacterComponent.addActionRowComponents(
            new ActionRowBuilder()
                .addComponents(dropdown)
        );
    } else {
        addCampaignToCharacterComponent.addTextDisplayComponents(
            new TextDisplayBuilder().setContent(
                '❌ No existing campaigns in this server. Have the DM of the campaign add one in the campaign manager tool.'
            )
        );
    }

    addCampaignToCharacterComponent.addSeparatorComponents(
        new SeparatorBuilder()
    );

    return addCampaignToCharacterComponent;
}