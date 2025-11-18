const db = require('../models');
const Admin = db.Admin;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
try {
const { email, password } = req.body;
if (!email || !password) return res.status(400).json({ message: 'Email & password required' });


const exists = await Admin.findOne({ where: { email } });
if (exists) return res.status(400).json({ message: 'Admin already exists' });


const hash = await bcrypt.hash(password, 10);
const admin = await Admin.create({ email, password: hash });
return res.json({ message: 'Admin registered', admin: { id: admin.id, email: admin.email } });
} catch (err) {
console.error(err);
return res.status(500).json({ message: 'Server error' });
}
};


exports.login = async (req, res) => {
try {
const { email, password } = req.body;
const admin = await Admin.findOne({ where: { email } });
if (!admin) return res.status(400).json({ message: 'Admin not found' });


const ok = await bcrypt.compare(password, admin.password);
if (!ok) return res.status(400).json({ message: 'Invalid credentials' });


const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' });
return res.json({ message: 'Login success', token });
} catch (err) {
console.error(err);
return res.status(500).json({ message: 'Server error' });
}
};