import { ContainerBuilder, SeparatorBuilder, SeparatorSpacingSize, TextDisplayBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } from "discord.js";

export function createFirstStatsComponent(userId, characterId){
    const firstStatsComponent = new ContainerBuilder()
        .addTextDisplayComponents(
            new TextDisplayBuilder()
                .setContent('## Edit Stats')
        )
        .addSeparatorComponents(
            new SeparatorBuilder()
                .setSpacing(SeparatorSpacingSize.Small)
            .setDivider(true)
        )

    let options = [];
    for (let i = 0; i < 21; i++){
        const option = new StringSelectMenuOptionBuilder()
            .setLabel(`${i}`)
            .setValue(`${i}`)
        
        options.push(option)
    }
    const STRdropdown = new StringSelectMenuBuilder()
        .setCustomId(`character_STR_dropdown:${userId}${characterId}`)
        .setPlaceholder('Select a score...')
        .addOptions(options)
    
    firstStatsComponent.addTextDisplayComponents(
            new TextDisplayBuilder()
                .setContent(`**Strength**`)
    );

    firstStatsComponent.addActionRowComponents(
        new ActionRowBuilder()
            .addComponents(STRdropdown)
    );

    const DEXdropdown = new StringSelectMenuBuilder()
        .setCustomId(`character_DEX_dropdown:${userId}${characterId}`)
        .setPlaceholder('Select a score...')
        .addOptions(options)

    firstStatsComponent.addTextDisplayComponents(
            new TextDisplayBuilder()
                .setContent(`**Dexterity**`)
    );
    firstStatsComponent.addActionRowComponents(
        new ActionRowBuilder()
            .addComponents(DEXdropdown)
    );

    const CONdropdown = new StringSelectMenuBuilder()
        .setCustomId(`character_CON_dropdown:${userId}${characterId}`)
        .setPlaceholder('Select a score...')
        .addOptions(options)

    firstStatsComponent.addTextDisplayComponents(
            new TextDisplayBuilder()
                .setContent(`**Constitution**`)
    );
    firstStatsComponent.addActionRowComponents(
        new ActionRowBuilder()
            .addComponents(CONdropdown)
    );

    const INTdropdown = new StringSelectMenuBuilder()
        .setCustomId(`character_INT_dropdown:${userId}${characterId}`)
        .setPlaceholder('Select a score...')
        .addOptions(options)

    firstStatsComponent.addTextDisplayComponents(
            new TextDisplayBuilder()
                .setContent(`**Intelligence**`)
    );
    firstStatsComponent.addActionRowComponents(
        new ActionRowBuilder()
            .addComponents(INTdropdown)
    );

    const WISdropdown = new StringSelectMenuBuilder()
        .setCustomId(`character_WIS_dropdown:${userId}${characterId}`)
        .setPlaceholder('Select a score...')
        .addOptions(options)

    firstStatsComponent.addTextDisplayComponents(
            new TextDisplayBuilder()
                .setContent(`**Wisdom**`)
    );
    firstStatsComponent.addActionRowComponents(
        new ActionRowBuilder()
            .addComponents(WISdropdown)
    );

    const CHAdropdown = new StringSelectMenuBuilder()
        .setCustomId(`character_CHA_dropdown:${userId}${characterId}`)
        .setPlaceholder('Select a score...')
        .addOptions(options)

    firstStatsComponent.addTextDisplayComponents(
            new TextDisplayBuilder()
                .setContent(`**Charisma**`)
    );
    firstStatsComponent.addActionRowComponents(
        new ActionRowBuilder()
            .addComponents(CHAdropdown)
    );

    firstStatsComponent.addSeparatorComponents(
        new SeparatorBuilder()
    );

    return firstStatsComponent;
}