import { ButtonBuilder, ButtonStyle, ContainerBuilder, SeparatorBuilder, SeparatorSpacingSize, TextDisplayBuilder, SectionBuilder } from "discord.js";
import { calculate_stat_modifiers } from "../../../data/HelperFunctions.js";

export function createCharacterSheetComponent(characterId, characterName, characterLevel, characterRace, characterClass, characterBackstory, charSTR, charDEX, charCON, charINT, charWIS, charCHA, charHP, charAC, charSPEED, campaignName, campaignPremise){
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
                    .setCustomId(`character_information_edit:${characterId}`)
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
                    `**STR** · ${charSTR} (${calculate_stat_modifiers(charSTR)})   **DEX** · ${charDEX} (${calculate_stat_modifiers(charDEX)})   **CON** · ${charCON} (${calculate_stat_modifiers(charCON)})\n` +
                    `**INT** · ${charINT} (${calculate_stat_modifiers(charINT)})   **WIS** · ${charWIS} (${calculate_stat_modifiers(charWIS)})   **CHA** · ${charCHA} (${calculate_stat_modifiers(charCHA)})\n`
                )
            )
            .setButtonAccessory(
                new ButtonBuilder()
                    .setCustomId(`character_skills_edit:${characterId}`)
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
                    `**HP**  · ${charHP}   **AC** · ${charAC}    **SPEED** · ${charSPEED} ft.`
                )
            )
            .setButtonAccessory(
                new ButtonBuilder()
                    .setCustomId(`character_stats_edit:${characterId}`)
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
                    .setCustomId(`edit_character_backstory_button:${characterId}`)
                    .setLabel('Edit')
                    .setStyle(ButtonStyle.Secondary)
            )
    );

    characterSheetComponent.addSeparatorComponents(
        new SeparatorBuilder()
    );

    characterSheetComponent.addTextDisplayComponents(
            new TextDisplayBuilder()
                .setContent(`## Campaign: ${campaignName}\n\n`+
                    `${campaignPremise}`
                )
        )

    characterSheetComponent.addSeparatorComponents(
        new SeparatorBuilder()
    );

    return characterSheetComponent;
}