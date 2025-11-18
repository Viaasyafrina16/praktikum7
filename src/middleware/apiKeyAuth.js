const db = require('../models');
const ApiKey = db.ApiKey;


module.exports = async (req, res, next) => {
try {
const key = req.headers['x-api-key'] || req.query.api_key;
if (!key) return res.status(401).json({ message: 'API key missing' });


const rec = await ApiKey.findOne({ where: { api_key: key } });
if (!rec) return res.status(403).json({ message: 'Invalid API key' });


// check assigned && not expired
if (!rec.status) return res.status(403).json({ message: 'API key not assigned/active' });
if (new Date(rec.out_of_date) <= new Date()) return res.status(403).json({ message: 'API key expired' });


req.apikey = rec;
next();
} catch (err) {
console.error(err);
return res.status(500).json({ message: 'Server error' });
}
};