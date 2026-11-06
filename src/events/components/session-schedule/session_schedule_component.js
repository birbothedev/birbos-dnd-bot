import { ButtonBuilder, ButtonStyle, ContainerBuilder, SeparatorBuilder, SeparatorSpacingSize, TextDisplayBuilder, SectionBuilder } from "discord.js";

export function createSessionScheduleComponent(campaign, date, description, campaignId, unixDate, sessionId, signUpText){
    const descriptionText = description ? description : "No session description given."
    const sessionScheduleComponent = new ContainerBuilder()
        .addTextDisplayComponents(
            new TextDisplayBuilder()
                .setContent('## 🗓️ Session Attendance')
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
                .setContent(`${descriptionText}`)
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
                    .setCustomId(`session_signup_button:${campaignId}:${unixDate}:${sessionId}`)
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
                    .setCustomId(`session_cancel_button:${campaignId}:${unixDate}:${sessionId}`)
                    .setLabel('Cancel')
                    .setStyle(ButtonStyle.Danger)
            )
    );

    sessionScheduleComponent.addSeparatorComponents(
        new SeparatorBuilder()
    );

    const signUpsMessage = !signUpText ? `### 👀 Current Attendees\n\nNo characters currently attending the session.` : `${signUpText}`

    sessionScheduleComponent.addTextDisplayComponents(
        new TextDisplayBuilder().setContent(
                signUpsMessage
            )
    );

    sessionScheduleComponent.addSeparatorComponents(
        new SeparatorBuilder()
    );

    return sessionScheduleComponent;
}