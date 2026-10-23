import { ButtonBuilder, ButtonStyle, ContainerBuilder, SeparatorBuilder, SeparatorSpacingSize, TextDisplayBuilder, SectionBuilder } from "discord.js";

export function createSessionScheduleComponent(campaign, date, description){
    const sessionScheduleComponent = new ContainerBuilder()
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
        .addTextDisplayComponents(
            new TextDisplayBuilder()
                .setContent(`${description}`)
        )
        .addSeparatorComponents(
            new SeparatorBuilder()
                .setSpacing(SeparatorSpacingSize.Small)
            .setDivider(true)
        )

    sessionScheduleComponent.addSectionComponents(
        new SectionBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(
                    `**✅ Sign Up**\nRegister your character to attend the session.`
                )
            )
            .setButtonAccessory(
                new ButtonBuilder()
                    .setCustomId(`session_signup_button`)
                    .setLabel('Sign Up')
                    .setStyle(ButtonStyle.Primary)
            )
    );

    sessionScheduleComponent.addSeparatorComponents(
        new SeparatorBuilder()
    );

    sessionScheduleComponent.addSectionComponents(
        new SectionBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(
                    `**❌ Cancel**\nRemove your character's registration from the session.`
                )
            )
            .setButtonAccessory(
                new ButtonBuilder()
                    .setCustomId(`session_cancel_button`)
                    .setLabel('Cancel')
                    .setStyle(ButtonStyle.Danger)
            )
    );

    sessionScheduleComponent.addSeparatorComponents(
        new SeparatorBuilder()
    );

    sessionScheduleComponent.addSectionComponents(
        new SectionBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(
                    `**👀 View**\nSee all characters that will be attending the session.`
                )
            )
            .setButtonAccessory(
                new ButtonBuilder()
                    .setCustomId(`session_attendees_button`)
                    .setLabel('View Characters')
                    .setStyle(ButtonStyle.Primary)
            )
    );

    sessionScheduleComponent.addSeparatorComponents(
        new SeparatorBuilder()
    );

    return sessionScheduleComponent;
}