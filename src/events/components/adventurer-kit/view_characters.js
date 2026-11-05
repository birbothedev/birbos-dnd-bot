import { ButtonBuilder, ButtonStyle, ContainerBuilder, SeparatorBuilder, SeparatorSpacingSize, TextDisplayBuilder, SectionBuilder } from "discord.js";

export function createViewCharactersComponent(activeCharacters, inactiveCharacters){
    const viewCharactersComponent = new ContainerBuilder()
        .addTextDisplayComponents(
            new TextDisplayBuilder()
                .setContent('## Your Characters')
        )
        .addSeparatorComponents(
            new SeparatorBuilder()
                .setSpacing(SeparatorSpacingSize.Small)
            .setDivider(true)
        )


    let activeCharactersText =`### Active Characters\n\n`;
    for (const char of activeCharacters){
        activeCharactersText += `**${char.character_name}**: Level ${char.character_level} ${char.character_race} ${char.character_class}\n`
    };
    if (activeCharacters.length <= 0){
        viewCharactersComponent.addTextDisplayComponents(
            new TextDisplayBuilder().setContent(
                `### Active Characters\n\nNo active characters to display. Add one by clicking "Add" in the Adventurer's Toolkit.`
            )
        );
    } else {
        viewCharactersComponent.addSectionComponents(
            new SectionBuilder()
                .addTextDisplayComponents(
                    new TextDisplayBuilder().setContent(activeCharactersText)
                )
                .setButtonAccessory(
                    new ButtonBuilder()
                        .setCustomId(`disable_active_characters`)
                        .setLabel('Edit')
                        .setStyle(ButtonStyle.Secondary)
                )
        );
    }
    

    viewCharactersComponent.addSeparatorComponents(
        new SeparatorBuilder()
    );

    let inActiveCharactersText =`### Inactive Characters\n\n`;
    for (const char of inactiveCharacters){
        inActiveCharactersText += `**${char.character_name}**: Level ${char.character_level} ${char.character_race} ${char.character_class}\n`
    };
    if (inactiveCharacters.length <= 0){
        viewCharactersComponent.addTextDisplayComponents(
            new TextDisplayBuilder().setContent(
                `### Inactive Characters\n\nNo inactive characters to display. Add one by clicking "Add" in the Adventurer's Toolkit and then edit to mark them as inactive.`
            )
        );
    } else {
        viewCharactersComponent.addSectionComponents(
            new SectionBuilder()
                .addTextDisplayComponents(
                    new TextDisplayBuilder().setContent(activeCharactersText)
                )
                .setButtonAccessory(
                    new ButtonBuilder()
                        .setCustomId(`disable_active_characters`)
                        .setLabel('Edit')
                        .setStyle(ButtonStyle.Secondary)
                )
        );
    }

    viewCharactersComponent.addSeparatorComponents(
        new SeparatorBuilder()
    );

    return viewCharactersComponent;
}