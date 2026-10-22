import { db } from '../../database.js';

export async function addCharacterToDB(campaignId, userId, username, characterName, characterClass, characterRace, characterBackstory){
    const row = db.prepare(`
            INSERT INTO player_characters
            (campaign_id, user_id, username, character_name, character_class, character_race, character_backstory)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            `).run(
                campaignId, userId, username, characterName, characterClass, characterRace, characterBackstory
            );
    return row.changes;
}  