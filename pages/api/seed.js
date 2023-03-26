const { default: db } = require("@/utils/db");

const handler= async (req, res) => {
await db.connect() ; 
}