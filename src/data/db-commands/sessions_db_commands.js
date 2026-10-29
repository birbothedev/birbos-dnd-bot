import { db } from '../../database.js';

export function addSessionSignUpToDB(campaignId, characterId, unixDateTime){
    const row = db.prepare(`
            INSERT INTO sessions
            (campaign_id, attending_character_id, unix_date_time)
            VALUES (?, ?, ?)
            `).run(
                campaignId, characterId, unixDateTime);
    return row.changes;
}

export function removeSessionSignUpFromDB(campaignId, characterId, unixDateTime){
    const row = db.prepare(`
            DELETE FROM sessions
            WHERE campaign_id = ?, attending_character_id = ?, unix_date_time = ?
            VALUES (?, ?, ?)
            `).run(
                campaignId, characterId, unixDateTime);
    return row.changes;
}

export function getCurrentSignUpByUserID(userId, campaignId, unixDate){
    const signUp = db.prepare(`
            SELECT *
            FROM sessions
            WHERE character_user_id = ? and unix_date_time = ? and campaign_id = ?
        `).get(userId, unixDate, campaignId);
    
        return signUp;
}