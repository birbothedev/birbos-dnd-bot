import { ButtonBuilder, ButtonStyle, ContainerBuilder, SeparatorBuilder, SeparatorSpacingSize, TextDisplayBuilder, SectionBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } from "discord.js";

export function createSessionRegistrationComponent(isCanceling, campaign, date){
    const sessionRegistrationComponent = new ContainerBuilder()
        .addTextDisplayComponents(
            new TextDisplayBuilder()
                .setContent('## 🗓️ Session Registration')
        )
        .addSeparatorComponents(
            new SeparatorBuilder()
                .setSpacing(SeparatorSpacingSize.Small)
            .setDivider(true)
        )
        .addTextDisplayComponents(
            new TextDisplayBuilder()
                .setContent(`**${campaign}** is scheduled for ${date}`)
        )
        .addSeparatorComponents(
            new SeparatorBuilder()
                .setSpacing(SeparatorSpacingSize.Small)
            .setDivider(true)
        )

    // look up characters from db
    const characters = [
        {
            name: "character 1",
            desc: "this is the character",
            value: "1"
        },
        {
            name: "character 2",
            desc: "this is the character",
            value: "2"
        }
    ]

    // if canceling
    if (isCanceling){
        sessionRegistrationComponent.addTextDisplayComponents(
            new TextDisplayBuilder()
                .setContent(`**❌ Cancel**\nRemove your character's registration from the session.`)
        )
    } else {
        sessionRegistrationComponent.addTextDisplayComponents(
            new TextDisplayBuilder()
                .setContent(`**✅ Sign Up**\nRegister your character for the session.`)
        )
    }

    const options = []
        for (const char of characters){
            const op = new StringSelectMenuOptionBuilder()
                .setLabel(char.name)
                .setDescription(char.desc)
                .setValue(char.value)
            
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