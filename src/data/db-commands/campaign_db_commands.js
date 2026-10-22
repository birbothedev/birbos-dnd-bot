import { db } from '../../database.js';

export async function addCampaignToDB(campaignName, campaignDescription, created_at, created_by){
    const row = db.prepare(`
            INSERT INTO campaigns
            (name, description, created_at, created_by)
            VALUES (?, ?, ?, ?)
            `).run(
                campaignName, campaignDescription, created_at, created_by
            );
    return row.changes;
}  

// isActive should be either 1 or 0 for active or inactive
export function getCampaignsList(isActive){
    const campaigns = db.prepare(`
        SELECT *
        FROM campaigns
        WHERE is_active = ?
    `).all(isActive);

    return campaigns;
}