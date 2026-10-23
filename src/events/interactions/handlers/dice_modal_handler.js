
import { MessageFlags } from "discord.js";
import { DM_USER_ID, DICE_CHANNEL_ID } from "../../../data/Globals.js";
import { roll_dice } from "../../../data/HelperFunctions.js";

export default {
    customId: 'dice_roller_modal', 
    type: 'modal',
    async execute(interaction) {
        const eventId = interaction.customId;
        const userId = interaction.user.id;
        const characterInput = interaction.fields.getTextInputValue('character_name');
        const dieSelected = interaction.fields.getStringSelectValues('select_dice_input');
        const diceQuantity = interaction.fields.getTextInputValue('dice_quantity_input');
        const dice_roll_privacy = interaction.fields.getRadioGroup('dice_privacy_selection');
        const channel = await interaction.client.channels.fetch(DICE_CHANNEL_ID);

        await interaction.deferReply({ flags: MessageFlags.Ephemeral });

        const number_of_dice = Number(diceQuantity);

        if (
            diceQuantity.trim() !== "" &&
            Number.isInteger(number_of_dice) &&
            number_of_dice >= 1 &&
            number_of_dice <= 100
        ){

            try {      
                // get dice inputs
                const die = Number(dieSelected[0])
                const rolled_dice = `${number_of_dice}D${die}`

                const rolled_value_message = roll_dice(characterInput, rolled_dice, die, number_of_dice);

                if (dice_roll_privacy === "dm") {
                    const dmUser = await interaction.client.users.fetch(DM_USER_ID);
                    // dmUser must be a Discord User object
                    await dmUser.send({
                        content: rolled_value_message
                    });

                    await interaction.editReply({
                        content: "Your dice roll was sent via DM!"
                    });
                } else if (dice_roll_privacy === "everyone"){
                    await channel.send({
                        content: rolled_value_message
                    });
                    await interaction.editReply({
                        content: rolled_value_message
                    });
                } else {
                    await interaction.editReply({
                        content: rolled_value_message
                    });
                }
                
            } catch (error) {
                console.error("Modal submit error: ", error);

                await interaction.editReply({
                    content: '❌ Something went wrong. Please wait a moment and try again!',
                    ephemeral: true
                });
            }

        } else {
            interaction.editReply({
                content: `⚠️ Please only use whole numbers between 1-100 for dice quantity.`
            });
        }
    }
};