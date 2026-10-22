import { ButtonBuilder, ButtonStyle, ContainerBuilder, SeparatorBuilder, SeparatorSpacingSize, TextDisplayBuilder, SectionBuilder } from "discord.js";

export function createDMDashboardComponent(){
    const dMDashboardComponent = new ContainerBuilder()
        .addTextDisplayComponents(
            new TextDisplayBuilder()
                .setContent(`## 📜 Campaign Manager\n\n` +
                    `Welcome! Choose an option below.`)
        )
        .addSeparatorComponents(
            new SeparatorBuilder()
                .setSpacing(SeparatorSpacingSize.Small)
            .setDivider(true)
        )

    dMDashboardComponent.addSectionComponents(
        new SectionBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(
                    `**👀 View Campaigns**\nSee a condensed list of all your active and inactive campaigns.`
                )
            )
            .setButtonAccessory(
                new ButtonBuilder()
                    .setCustomId(`campaigns_view`)
                    .setLabel('View')
                    .setStyle(ButtonStyle.Primary)
            )
    );

    dMDashboardComponent.addSeparatorComponents(
        new SeparatorBuilder()
    );

    dMDashboardComponent.addSectionComponents(
        new SectionBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(
                    `**✅ Add a Campaign**\nAdd a Campaign to the database.`
                )
            )
            .setButtonAccessory(
                new ButtonBuilder()
                    .setCustomId(`add_campaign_button`)
                    .setLabel('Add')
                    .setStyle(ButtonStyle.Primary)
            )
    );

    dMDashboardComponent.addSeparatorComponents(
        new SeparatorBuilder()
    );

    dMDashboardComponent.addSectionComponents(
        new SectionBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(
                    `**✏️ Edit Campaigns**\nEdit a specific campaign or mark it as inactive.`
                )
            )
            .setButtonAccessory(
                new ButtonBuilder()
                    .setCustomId(`edit_campaign_button`)
                    .setLabel('Edit')
                    .setStyle(ButtonStyle.Secondary)
            )
    );

    dMDashboardComponent.addSeparatorComponents(
        new SeparatorBuilder()
    );

    dMDashboardComponent.addSectionComponents(
        new SectionBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(
                    `**❌ Delete**\nPermanently remove a campaign from the database.`
                )
            )
            .setButtonAccessory(
                new ButtonBuilder()
                    .setCustomId(`delete_campaign_button`)
                    .setLabel('Delete')
                    .setStyle(ButtonStyle.Danger)
            )
    );

    dMDashboardComponent.addSeparatorComponents(
        new SeparatorBuilder()
    );

    dMDashboardComponent.addSectionComponents(
        new SectionBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(
                    `**📅 Schedule**\nSchedule an upcoming session.`
                )
            )
            .setButtonAccessory(
                new ButtonBuilder()
                    .setCustomId(`session_scheduler`)
                    .setLabel('Schedule')
                    .setStyle(ButtonStyle.Success)
            )
    );

    dMDashboardComponent.addSeparatorComponents(
        new SeparatorBuilder()
    );

    return dMDashboardComponent;
}