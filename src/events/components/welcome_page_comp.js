import { ButtonBuilder, ButtonStyle, ContainerBuilder, SeparatorBuilder, SeparatorSpacingSize, TextDisplayBuilder, SectionBuilder, MediaGalleryBuilder, MediaGalleryItemBuilder } from "discord.js";
import { ACCENT_COLOR } from "../../data/Globals.js";

export function createWelcomePageComponent(banner){
    const welcomePageComponent = new ContainerBuilder()
        .setAccentColor(ACCENT_COLOR)
        .addTextDisplayComponents(
            new TextDisplayBuilder()
                .setContent(`## 🍻 THE SOBER DWARF TAVERN \n\n` +
                    `Welcome! Choose an option below.`)
        )
        .addSeparatorComponents(
            new SeparatorBuilder()
                .setSpacing(SeparatorSpacingSize.Small)
            .setDivider(true)
        )

    welcomePageComponent.addSectionComponents(
        new SectionBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(
                    `**⚔️ Character Tools**\nCharacter specific dice rolls, character sheets, and party utilities.`
                )
            )
            .setButtonAccessory(
                new ButtonBuilder()
                    .setCustomId(`adventurers_tools`)
                    .setLabel('View')
                    .setStyle(ButtonStyle.Primary)
            )
    );

    welcomePageComponent.addSeparatorComponents(
        new SeparatorBuilder()
    );

    welcomePageComponent.addSectionComponents(
        new SectionBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(
                    `**📜 Campaign Manager**\nAdd, manage, or schedule campaigns.`
                )
            )
            .setButtonAccessory(
                new ButtonBuilder()
                    .setCustomId(`campaign_dashboard`)
                    .setLabel('View')
                    .setStyle(ButtonStyle.Primary)
            )
    );

    welcomePageComponent.addSeparatorComponents(
        new SeparatorBuilder()
    );

    welcomePageComponent.addSectionComponents(
        new SectionBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(
                    `**🎲 Dice Roller**\nDecide your fate with a stroke of luck and a flat roll, no modifiers.`
                )
            )
            .setButtonAccessory(
                new ButtonBuilder()
                    .setCustomId(`dice_roller`)
                    .setLabel('Roll')
                    .setStyle(ButtonStyle.Secondary)
            )
    );

    welcomePageComponent.addSeparatorComponents(
        new SeparatorBuilder()
    );

    welcomePageComponent.addSectionComponents(
        new SectionBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(
                    `**🍻 Adventurer's Guild**\nQuest board, hall of fame, tavern games, and dueling arena.`
                )
            )
            .setButtonAccessory(
                new ButtonBuilder()
                    .setCustomId(`tavern_button`)
                    .setLabel('Visit')
                    .setStyle(ButtonStyle.Primary)
            )
    );

    welcomePageComponent.addSeparatorComponents(
        new SeparatorBuilder()
    );

    welcomePageComponent.addMediaGalleryComponents(
        new MediaGalleryBuilder().addItems(
            new MediaGalleryItemBuilder()
                .setURL(`attachment://${banner}`)
                .setDescription('Main Image Description')
        )
    )

    return welcomePageComponent;
}