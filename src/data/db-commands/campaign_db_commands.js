import { db } from '../../database.js';

export async function addCampaignToDB(campaignName, campaignDescription, created_at, userId, serverId){
    const row = db.prepare(`
            INSERT INTO campaigns
            (user_id, name, description, created_at, server_id)
            VALUES (?, ?, ?, ?, ?)
            `).run(
                userId, campaignName, campaignDescription, created_at, serverId
            );
    return row.changes;
}  

export function getCampaignsInServerList(isActive, serverId){
    const campaigns = db.prepare(`
        SELECT *
        FROM campaigns
        WHERE is_active = ? and server_id = ?
    `).all(isActive, serverId);

    return campaigns;
}

// isActive should be either 1 or 0 for active or inactive
export function getActiveCampaignsByUserID(isActive, userId){
    const campaigns = db.prepare(`
        SELECT *
        FROM campaigns
        WHERE is_active = ? and user_id = ?
    `).all(isActive, userId);

    return campaigns;
}

export function getAllCampaignsByUserId(userId){
    const campaigns = db.prepare(`
        SELECT *
        FROM campaigns
        WHERE and user_id = ?
    `).all(userId);

    return campaigns;
}

export function getCampaignByCampaignID(campaignId){
    const campaign = db.prepare(`
        SELECT *
        FROM campaigns
        WHERE id = ?
    `).get(campaignId);

    return campaign;
}

export function getCampaignIDByCharacterID(characterId){
    const campaign = db.prepare(`
        SELECT campaign_id
        FROM player_characters
        WHERE id = ?
    `).get(characterId);

    return campaign;
}