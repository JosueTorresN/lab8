const jwt = require('jsonwebtoken');
const config = require('../config');
const { readData } = require('../services/jsonDb.service');

const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const users = await readData('users.json');
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
      const error = new Error('Unauthorized: Invalid credentials');
      error.statusCode = 401;
      return next(error);
    }

    const tokenPayload = { id: user.id, role: user.role };
    const token = jwt.sign(tokenPayload, config.jwtSecret, { expiresIn: '1h' });

    res.success(200, { token });
  } catch (error) {
    next(error);
  }
};

module.exports = { login };