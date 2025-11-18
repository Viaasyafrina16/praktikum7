const db = require('../models');
const ApiKey = db.ApiKey;
const crypto = require('crypto');


function generateApiKey() {
return crypto.randomBytes(32).toString('hex'); // 64 chars
}


exports.generate = async (req, res) => {
try {
const { out_of_date } = req.body; // optional, boleh dikirim
const api_key = generateApiKey();
const outDate = out_of_date ? new Date(out_of_date) : new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // default 30 hari


const rec = await ApiKey.create({ api_key, out_of_date: outDate, status: false, userId: null });
return res.json({ message: 'API Key generated', apikey: rec });
} catch (err) {
console.error(err);
return res.status(500).json({ message: 'Server error' });
}
};


exports.list = async (req, res) => {
try {
const keys = await ApiKey.findAll({ include: [{ model: db.User }] });


// Update status berdasarkan out_of_date bila perlu (ke expired)
const now = new Date();
const mapped = await Promise.all(keys.map(async (k) => {
const obj = k.toJSON();
if (new Date(obj.out_of_date) <= now) {
// expired => set status false
if (obj.status === true) {
await ApiKey.update({ status: false }, { where: { id: obj.id } });
obj.status = false;
}
}
return obj;
}));


return res.json(mapped);
} catch (err) {
console.error(err);
return res.status(500).json({ message: 'Server error' });
}
};


exports.verify = async (req, res) => {
try {
const { api_key } = req.body;
if (!api_key) return res.status(400).json({ message: 'api_key required' });


const rec = await ApiKey.findOne({ where: { api_key } });
if (!rec) return res.status(404).json({ message: 'Api key not found' });


if (new Date(rec.out_of_date) <= new Date()) return res.status(403).json({ message: 'Api key expired' });
if (!rec.status) return res.status(403).json({ message: 'Api key not assigned/active' });


return res.json({ ok: true, apiKey: rec });
} catch (err) {
console.error(err);
return res.status(500).json({ message: 'Server error' });
}
};