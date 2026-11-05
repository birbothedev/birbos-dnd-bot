import { db } from '../../database.js';

export function addCharacterToDB(totalLevel, userId, username, characterName, characterClass, characterRace, characterBackstory){
    const row = db.prepare(`
            INSERT INTO player_characters
            (character_level, user_id, username, character_name, character_class, character_race, character_backstory)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            `).run(
                totalLevel, userId, username, characterName, characterClass, characterRace, characterBackstory
            );
    return row.changes;
}  

export function deleteCharacterFromDB(characterId, userId){
    const row = db.prepare(`
            DELETE FROM player_characters
            WHERE id = ? and user_id = ?
        `).run(characterId, userId);
    
    return row.changes;
}

export function getCharactersByUserID(userId){
    const characters = db.prepare(`
        SELECT *
        FROM player_characters
        WHERE user_id = ?
    `).all(userId);

    return characters;
}

export function getActiveCharactersByUserID(userId, isActive){
    const characters = db.prepare(`
        SELECT *
        FROM player_characters
        WHERE user_id = ? and is_active = ?
    `).all(userId, isActive);

    return characters;
}

export function getCharacterByCharacterID(characterId, userId){
    const characters = db.prepare(`
        SELECT *
        FROM player_characters
        WHERE id = ? and user_id = ?
    `).get(characterId, userId);

    return characters;
}

export function updateCharacterAbilityScoresInDB(characterId, userId, str, dex, con, int, wis, cha){
    const row = db.prepare(`
            UPDATE player_characters
            SET strength = ?, dexterity = ?, constitution = ?,
            intelligence = ?, wisdom = ?, charisma = ?
            WHERE id = ? and user_id = ?
        `).run(str, dex, con, int, wis, cha, characterId, userId);
    
    return row.changes;
}

export function updateCampaignForCharacter(campaignId, userId, characterId){
    const row = db.prepare(`
            UPDATE player_characters
            SET campaign_id = ?
            WHERE id = ? and user_id = ?
        `).run(campaignId, characterId, userId);
    
    return row.changes;
}

export function updateCharacterBackstory(userId, characterId, backstory){
    const row = db.prepare(`
            UPDATE player_characters
            SET character_backstory = ?
            WHERE id = ? and user_id = ?
        `).run(backstory, characterId, userId);
    
    return row.changes;
}