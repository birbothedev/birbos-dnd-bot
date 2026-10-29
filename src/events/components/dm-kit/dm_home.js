import { ButtonBuilder, ButtonStyle, ContainerBuilder, SeparatorBuilder, SeparatorSpacingSize, TextDisplayBuilder, SectionBuilder, StringSelectMenuOptionBuilder, StringSelectMenuBuilder, ActionRowBuilder } from "discord.js";
import { getCampaignsList } from "../../../data/db-commands/campaign_db_commands.js";

export function createDMDashboardComponent(userId){
    const campaigns = getCampaignsList(1, userId);
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

    if(campaigns.length >= 1){

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
    } else {
        dMDashboardComponent.addTextDisplayComponents(
            new TextDisplayBuilder().setContent(
                '**📅 Schedule**\nPlease add an active campaign before attempting to schedule a session.'
            )
        );
    }

    dMDashboardComponent.addSeparatorComponents(
        new SeparatorBuilder()
    );

    if(campaigns.length >= 1){
        const options = []
        for (const char of campaigns){
            const op = new StringSelectMenuOptionBuilder()
                .setLabel(char.name)
                .setValue(`${char.id}`)
            
            options.push(op)
        }
        const dropdown = new StringSelectMenuBuilder()
            .setCustomId('edit_campaign_button_dropdown')
            .setPlaceholder('Select a campaign...')
            .addOptions(options)
        
        dMDashboardComponent.addTextDisplayComponents(
            new TextDisplayBuilder().setContent(
                '**📝 Campaign Editor**\nView or Edit a specific campaign, mark it as inactive, or delete it from the database.'
            )
        );

        dMDashboardComponent.addActionRowComponents(
            new ActionRowBuilder()
                .addComponents(dropdown)
        );
    } else {
        dMDashboardComponent.addTextDisplayComponents(
            new TextDisplayBuilder().setContent(
                '**📝 Campaign Editor**\nPlease add a campaign before attempting to edit a campaign.'
            )
        );
    }

    dMDashboardComponent.addSeparatorComponents(
        new SeparatorBuilder()
    );

    return dMDashboardComponent;
}