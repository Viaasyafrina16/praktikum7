const db = require('../models');
const User = db.User;
const ApiKey = db.ApiKey;


// Buat user baru dan assign api key jika dikirim
exports.createUser = async (req, res) => {
try {
const { firstname, lastname, email, api_key, out_of_date } = req.body;
if (!firstname || !lastname || !email) return res.status(400).json({ message: 'Missing fields' });


// Buat user (jika email belum ada)
let user = await User.findOne({ where: { email } });
if (!user) user = await User.create({ firstname, lastname, email });


if (api_key) {
// Cari apikey yang sesuai dan belum ter-assign
const keyRecord = await ApiKey.findOne({ where: { api_key, userId: null } });
if (!keyRecord) return res.status(400).json({ message: 'API Key tidak tersedia atau sudah dipakai' });


// Assign ke user
keyRecord.userId = user.id;
keyRecord.status = true; // sudah dipakai
if (out_of_date) keyRecord.out_of_date = new Date(out_of_date);
await keyRecord.save();
}


return res.json({ message: 'User created/updated', user });
} catch (err) {
console.error(err);
return res.status(500).json({ message: 'Server error' });
}
};


exports.getAllUsers = async (req, res) => {
try {
const users = await User.findAll({ include: [{ model: ApiKey }] });
return res.json(users);
} catch (err) {
console.error(err);
return res.status(500).json({ message: 'Server error' });
}
};