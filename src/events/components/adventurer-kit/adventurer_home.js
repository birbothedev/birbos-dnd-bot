import { ButtonBuilder, ButtonStyle, ContainerBuilder, SeparatorBuilder, SeparatorSpacingSize, TextDisplayBuilder, SectionBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";
import { getCharactersByUserID } from "../../../data/db-commands/character_db_commands.js";

export function createAdventurerDashboardComponent(userId, isActive){
    const adventurerDashboardComponent = new ContainerBuilder()
        .addTextDisplayComponents(
            new TextDisplayBuilder()
                .setContent(`## ⚔️ Adventurer's Toolkit\n\n` +
                    `Welcome! Choose an option below.`)
        )
        .addSeparatorComponents(
            new SeparatorBuilder()
                .setSpacing(SeparatorSpacingSize.Small)
            .setDivider(true)
        )

    adventurerDashboardComponent.addSectionComponents(
        new SectionBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(
                    `**👀 View Characters**\nSee a condensed list of all your active and inactive characters.`
                )
            )
            .setButtonAccessory(
                new ButtonBuilder()
                    .setCustomId(`characters_view`)
                    .setLabel('View')
                    .setStyle(ButtonStyle.Primary)
            )
    );

    adventurerDashboardComponent.addSeparatorComponents(
        new SeparatorBuilder()
    );

    adventurerDashboardComponent.addSectionComponents(
        new SectionBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(
                    `**✅ Add a Character**\nAdd a Character to the database.`
                )
            )
            .setButtonAccessory(
                new ButtonBuilder()
                    .setCustomId(`add_character`)
                    .setLabel('Add')
                    .setStyle(ButtonStyle.Primary)
            )
    );

    adventurerDashboardComponent.addSeparatorComponents(
        new SeparatorBuilder()
    );

    const characters = getCharactersByUserID(userId, isActive);
    if(characters.length >= 1){
        const options = []
        for (const char of characters){
            const op = new StringSelectMenuOptionBuilder()
                .setLabel(char.character_name)
                .setValue(`${char.id}`)
            
            options.push(op)
        }
        const dropdown = new StringSelectMenuBuilder()
            .setCustomId('character_sheet_dropdown')
            .setPlaceholder('Select a character...')
            .addOptions(options)
        
        adventurerDashboardComponent.addTextDisplayComponents(
            new TextDisplayBuilder().setContent(
                '### 📝 Character Sheet\nView or Edit a specific character or mark them as inactive.'
            )
        );

        adventurerDashboardComponent.addActionRowComponents(
            new ActionRowBuilder()
                .addComponents(dropdown)
        );
    } else {
        adventurerDashboardComponent.addTextDisplayComponents(
            new TextDisplayBuilder().setContent(
                '### 📝 Character Sheet\nPlease add a character before attempting to edit a character sheet.'
            )
        );
    }
    

    adventurerDashboardComponent.addSeparatorComponents(
        new SeparatorBuilder()
    );

    return adventurerDashboardComponent;
}