import { ButtonBuilder, ButtonStyle, ContainerBuilder, SeparatorBuilder, SeparatorSpacingSize, TextDisplayBuilder, SectionBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } from "discord.js";

export function createSessionRegistrationComponent(isCanceling, campaign, date, charactersList, campaignId, unixDate){
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
        for (const char of charactersList){
            const op = new StringSelectMenuOptionBuilder()
                .setLabel(char.character_name)
                .setDescription(char.character_backstory.slice(0,100))
                .setValue(String(char.id))
            
            options.push(op)
        }
    const dropdown = new StringSelectMenuBuilder()
        .setCustomId(`session_reg_character_dropdown:${isCanceling}${campaignId}:${unixDate}`)
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