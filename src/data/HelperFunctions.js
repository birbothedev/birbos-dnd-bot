
// dice roller
export function roll_dice(character, rolled_dice, die, number_of_dice){
    const rolls = [];
    let total = 0;

    for (let i = 0; i < number_of_dice; i++) {
        const roll = Math.floor(Math.random() * die) + 1;
        rolls.push(roll);
        total += roll;
    }
    
    return `🎲 ${character} rolled **${rolled_dice}**: [ ${rolls.join(', ')} ] = **${total}**`;

}

// get stat modifiers
export function calculate_stat_modifiers(stat){
    const modifier = Math.floor((stat - 10) / 2);

    return modifier >= 0 ? `+${modifier}` : `${modifier}`;;
}

// get date and time in discord timestamp format
export function parseUserDateAndTime(date, time){
    const jsDate = new Date(`${date}T${time}`);

    const unixDate = Math.floor(jsDate.getTime() / 1000);

    return `<t:${unixDate}:F>`;
}