import { ButtonBuilder, ButtonStyle, ContainerBuilder, SeparatorBuilder, SeparatorSpacingSize, TextDisplayBuilder, SectionBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } from "discord.js";

export function createActivityStatusComponent(isActive, charactersList){
    const sessionRegistrationComponent = new ContainerBuilder()
        .addTextDisplayComponents(
            new TextDisplayBuilder()
                .setContent('## Characters')
        )
        .addSeparatorComponents(
            new SeparatorBuilder()
                .setSpacing(SeparatorSpacingSize.Small)
            .setDivider(true)
        )
        .addTextDisplayComponents(
            new TextDisplayBuilder()
                .setContent(`Set a character's activity status.`)
        )
        .addSeparatorComponents(
            new SeparatorBuilder()
                .setSpacing(SeparatorSpacingSize.Small)
            .setDivider(true)
        )

    if (isActive){
        sessionRegistrationComponent.addTextDisplayComponents(
            new TextDisplayBuilder()
                .setContent(`**❌ Disable**\nSet a currently active character as inactive.`)
        )
    } else {
        sessionRegistrationComponent.addTextDisplayComponents(
            new TextDisplayBuilder()
                .setContent(`**✅ Enable**\nSet a currently inactive character as active.`)
        )
    }

    const options = []
        for (const char of charactersList){
            const op = new StringSelectMenuOptionBuilder()
                .setLabel(char.character_name)
                .setDescription(`Level ${char.character_level} ${char.character_race} ${char.character_class}`)
                .setValue(String(char.id));
            
            options.push(op)
        }
    const dropdown = new StringSelectMenuBuilder()
        .setCustomId('session_reg_character_dropdown')
        .setPlaceholder('Select a character...')
        .addOptions(options)

    sessionRegistrationComponent.addSeparatorComponents(
        new SeparatorBuilder()
    );
    sessionRegistrationComponent.addActionRowComponents(
        new ActionRowBuilder()
            .addComponents(dropdown)
    );

    return sessionRegistrationComponent;
}