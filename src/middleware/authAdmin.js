const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
try {
const header = req.headers.authorization || '';
const token = header.startsWith('Bearer ') ? header.slice(7) : null;
if (!token) return res.status(401).json({ message: 'Token missing' });


const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.admin = decoded;
next();
} catch (err) {
console.error(err);
return res.status(401).json({ message: 'Invalid token' });
}
};