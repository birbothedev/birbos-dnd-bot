import { db } from '../../database.js';

export function addSessionScheduleToDB(campaignId, userId, unixDate, allowedRoleId, descriptionInput){
    const row = db.prepare(`
            INSERT INTO session_scheduler
            (campaign_id, dm_id, unix_date_time, allowed_role_id, session_description)
            VALUES (?, ?, ?, ?, ?)
            RETURNING id
            `).run(
                campaignId, userId, unixDate, allowedRoleId, descriptionInput);
    return row;
}

export function getSessionBySessionId(sessionId){
    const session = db.prepare(`
        SELECT 
            id,
            campaign_id,
            dm_id,
            unix_date_time,
            session_description,
            CAST(allowed_role_id AS TEXT) AS allowed_role_id_text,
            CAST(scheduler_message_channel_id AS TEXT) AS scheduler_message_channel_id_text,
            CAST(scheduler_message_id AS TEXT) AS scheduler_message_id_text
        FROM session_scheduler
        WHERE id = ?
        `).get(sessionId);
    
    return session;
}

export function addMessageIdToDB(messageId, channelId, sessionId, unixDate){
    const row = db.prepare(`
            UPDATE session_scheduler
            SET scheduler_message_id = ?, scheduler_message_channel_id = ?
            WHERE id = ? and unix_date_time = ?
        `).run(messageId, channelId, sessionId, unixDate);
    
    return row.changes;
}

export function addSessionSignUpToDB(sessionId, characterId, unixDateTime, userId){
    const row = db.prepare(`
            INSERT INTO session_attendees
            (session_id, attending_character_id, unix_date_time, character_user_id)
            VALUES (?, ?, ?, ?)
            `).run(
                sessionId, characterId, unixDateTime, userId);
    return row.changes;
}

export function removeSessionSignUpFromDB(sessionId, characterId, unixDateTime, userId){
    const row = db.prepare(`
            DELETE FROM session_attendees
            WHERE session_id = ? and attending_character_id = ? and unix_date_time = ? and character_user_id = ?
            `).run(
                sessionId, characterId, unixDateTime, userId);
    return row.changes;
}

export function getCurrentSignUpByUserID(userId, sessionId, unixDate){
    const signUp = db.prepare(`
            SELECT *
            FROM session_attendees
            WHERE character_user_id = ? and unix_date_time = ? and session_id = ?
        `).all(userId, unixDate, sessionId);
    
        return signUp;
}

export function getAllSignUpsForSession(sessionId){
    const signUps = db.prepare(`
        SELECT 
            id,
            session_id,
            attending_character_id,
            CAST (character_user_id AS TEXT) AS character_user_id_text,
            unix_date_time
        FROM session_attendees
        WHERE session_id = ?
        `).all(sessionId);
    
    return signUps;
}