import Database from "better-sqlite3";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const db = new Database(
    path.resolve(__dirname, "..", "databases", "campaigns-database.sqlite")
);

// WAL = write ahead logging, writes go into a separate file and are merged into the DB later (safer and prevents reads from blocking writes)
db.pragma("journal_mode = WAL");

//table to store all campaigns
db.prepare(`
    CREATE TABLE IF NOT EXISTS campaigns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    created_at INTEGER,
    is_active INTEGER DEFAULT 1
    )
`).run();

//table to store all player characters
db.prepare(`CREATE TABLE IF NOT EXISTS player_characters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    campaign_id INTEGER NOT NULL,
    user_id TEXT NOT NULL,
    username TEXT NOT NULL,
    character_name TEXT NOT NULL,
    character_level INTEGER,
    character_class TEXT NOT NULL,
    character_multiclass TEXT,
    character_race TEXT,
    character_backstory TEXT NOT NULL,
    strength INTEGER,
    dexterity INTEGER,
    constitution INTEGER,
    intelligence INTEGER,
    wisdom INTEGER,
    charisma INTEGER,
    health_points INTEGER,
    armor_class INTEGER,
    speed INTEGER,
    is_active INTEGER DEFAULT 1, 
    FOREIGN KEY (campaign_id) REFERENCES campaigns(id)
    )
`).run();

//table to store all npcs
db.prepare(`CREATE TABLE IF NOT EXISTS np_characters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    campaign_id INTEGER NOT NULL,
    character_name TEXT NOT NULL,
    character_level INTEGER NOT NULL,
    character_class TEXT NOT NULL,
    character_multiclass TEXT,
    character_race TEXT NOT NULL,
    is_active INTEGER DEFAULT 1, 
    FOREIGN KEY (campaign_id) REFERENCES campaigns(id)
    )
`).run();

// table to store all sessions
db.prepare(`CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    campaign_id INTEGER NOT NULL,
    attending_character_id TEXT,
    character_user_id INTEGER NOT NULL,
    unix_date_time INTEGER NOT NULL,
    FOREIGN KEY (campaign_id) REFERENCES campaigns(id)
    )
`).run();