import { ButtonBuilder, ButtonStyle, ContainerBuilder, SeparatorBuilder, SeparatorSpacingSize, TextDisplayBuilder, SectionBuilder } from "discord.js";

export function createAdventurerDashboardComponent(){
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

    adventurerDashboardComponent.addSectionComponents(
        new SectionBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(
                    `**✏️ Edit Characters**\nEdit a specific character or mark them as inactive.`
                )
            )
            .setButtonAccessory(
                new ButtonBuilder()
                    .setCustomId(`session_cancel_button`)
                    .setLabel('Edit')
                    .setStyle(ButtonStyle.Secondary)
            )
    );

    adventurerDashboardComponent.addSeparatorComponents(
        new SeparatorBuilder()
    );

    adventurerDashboardComponent.addSectionComponents(
        new SectionBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(
                    `**❌ Delete**\nPermanently remove a character from the database.`
                )
            )
            .setButtonAccessory(
                new ButtonBuilder()
                    .setCustomId(`session_attendees_button`)
                    .setLabel('Delete')
                    .setStyle(ButtonStyle.Danger)
            )
    );

    adventurerDashboardComponent.addSeparatorComponents(
        new SeparatorBuilder()
    );

    return adventurerDashboardComponent;
}