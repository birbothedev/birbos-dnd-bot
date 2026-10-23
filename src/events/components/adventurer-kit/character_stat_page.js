import { ButtonBuilder, ButtonStyle, ContainerBuilder, SeparatorBuilder, SeparatorSpacingSize, TextDisplayBuilder, SectionBuilder } from "discord.js";

export function createCharacterSheetComponent(characterName, characterLevel, characterRace, characterClass, characterBackstory){
    const characterSheetComponent = new ContainerBuilder()
        .addTextDisplayComponents(
            new TextDisplayBuilder()
                .setContent(`## ◆ CHARACTER SHEET ◆\n\n`)
        )
        .addSeparatorComponents(
            new SeparatorBuilder()
                .setSpacing(SeparatorSpacingSize.Small)
            .setDivider(true)
        )

    characterSheetComponent.addSectionComponents(
        new SectionBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(
                    `**${characterName} • Level ${characterLevel}**\n` +
                    `${characterRace} • ${characterClass}`
                )
            )
            .setButtonAccessory(
                new ButtonBuilder()
                    .setCustomId(`character_information_edit`)
                    .setLabel('Edit')
                    .setStyle(ButtonStyle.Secondary)
            )
    );

    characterSheetComponent.addSeparatorComponents(
        new SeparatorBuilder()
    );

    characterSheetComponent.addSectionComponents(
        new SectionBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(
                    "### Ability Scores\n\n" +
                    "**STR** · 16 (+3)   **DEX** · 12 (+1)   **CON** · 15 (+2)\n" +
                    "**INT** · 10 (+0)   **WIS** · 11 (+0)   **CHA** · 8 (-1)\n"
                )
            )
            .setButtonAccessory(
                new ButtonBuilder()
                    .setCustomId(`character_skills_edit`)
                    .setLabel('Edit')
                    .setStyle(ButtonStyle.Secondary)
            )
    );

    characterSheetComponent.addSeparatorComponents(
        new SeparatorBuilder()
    );

    characterSheetComponent.addSectionComponents(
        new SectionBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(
                    "### Combat Scores\n\n" +
                    "**HP**  · 50   **AC** · 18    **SPEED** · 40 ft."
                )
            )
            .setButtonAccessory(
                new ButtonBuilder()
                    .setCustomId(`character_stats_edit`)
                    .setLabel('Edit')
                    .setStyle(ButtonStyle.Secondary)
            )
    );

    characterSheetComponent.addSeparatorComponents(
        new SeparatorBuilder()
    );

    characterSheetComponent.addSectionComponents(
        new SectionBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(
                    "### Backstory\n\n" +
                    `${characterBackstory}`
                )
            )
            .setButtonAccessory(
                new ButtonBuilder()
                    .setCustomId(`edit_character_backstory_button`)
                    .setLabel('Edit')
                    .setStyle(ButtonStyle.Secondary)
            )
    );

    characterSheetComponent.addSeparatorComponents(
        new SeparatorBuilder()
    );

    return characterSheetComponent;
}