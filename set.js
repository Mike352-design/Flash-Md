const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU045WGJkY2FyZGQyd1pOSzF4aVVNdlFGL25OSzNIdFcwRWcvS2xZb0YyZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRk91bXk1SGVEZkZERWF5U1Fnd0wyWXdRUGU3Sm1IRWVCdk1DaXJwK1dpZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzTkdRUk1jY2h5ZHYxakxwSHl5SzhFN0FUcGFud2VFdDROanJ0TDlKRUc4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRVWxtRmZ2UG1odHp1eGEweVB3MmhmeEpPNnF6WEhTZDgrcjZNUUtQYkNBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVNY05NbGcyUWZ0R3dMVHl2MkZ5RG51WTJhM3VCZTVNdTNHL05lN0VVME09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJZNisyRkRTMjQrM1R5OFNnUmxvMHB6M2FUcm1ycksrRnVOYTZldGY3QnM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia1AvTElab0VsV1ZVenRrejRQZStGWE1hZk8vMHBkV3RTRTZyMXREOGNuOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSTVyR0sxL0xIQTdkd3dLbHYzOStOMXpuNmhXbm5RUnd6VTJFWWwydjZIZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ijd2MWlQRGlOZXFnZHBJVzFGK2Vxb1ovUmYvL1lnODBjcDdaVktVcGc0L2VacHkreE10VDB4ek1GSkdmWTNKbEhxRDdkaXV0UnVDU3MvL2hxZmpNRkJRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQyLCJhZHZTZWNyZXRLZXkiOiJrUmVxZXRrVGZPMzYzK1FUNlI1REJJMVdRb0FJekdrVXdrb2dRQUJxRVRZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJzQ3Nqck1VQ1ROS1ZvaDgyLTJmNzZnIiwicGhvbmVJZCI6IjBjYTkzZDNjLTM0MzMtNDQ2Ni04YTIyLTE4ZWY5Yzk0ODBlOSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnMGczOUYvY3lUaU9XUDFVNGN5Qi8wRS9Oa3c9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTmFoZk56U2J5WlZOV1FtbFpPMHExcGJXNDc0PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlRNNjlSWDRBIiwibWUiOnsiaWQiOiIyNTQxMDQ5MTYwOTE6MTRAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0lydG9xTURFS3lwaExZR0dBTWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImErL3NyVktwQTc2V3ArV2w5UWV6MGRnRHd1bjZ0LzVVd0k0YlZqVTFNQWs9IiwiYWNjb3VudFNpZ25hdHVyZSI6InNrOFZZczVxdHFmNTFyd0RnSDdnRUJBWU5CRUNNTVV3bHQwbWhCTTBDTVd2bmJQU2hqRjc2QWhvZGNRcWx6RkVBOG1JenYydEdUekN1WklDMldHakNRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJNYnc0anY0b3ZHT091WGpTYUxyaUtNSHEraFpKeWFEZmpLZWU0cFB0dTBTS2xYMmhlWk44NUkrVzZuMUpacE85L1ZZSTR5bHFWVkE5dUgrbUFzZitCQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDEwNDkxNjA5MToxNEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJXdnY3SzFTcVFPK2xxZmxwZlVIczlIWUE4THArcmYrVk1DT0cxWTFOVEFKIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIzOTI5Nzg2fQ==',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Alvino",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "254 104 916091", 
    A_REACT : process.env.AUTO_REACTION || 'on',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
//    ADM : process.env.ANTI_DELETE_MESSAGE || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd" : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
