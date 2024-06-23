const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET_KEY = 'as2809';
const DUMMY_CREDENTIALS = { username: 'saltman', password: 'oai1122' };

const login = (req, res) => {
    const { username, password } = req.body;
    // console.log(username , password)
    //sds
    if (username === DUMMY_CREDENTIALS.username && password === DUMMY_CREDENTIALS.password) {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
};

module.exports = { login };
