const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword, role });
  await user.save();
  res.status(201).send({ message: 'User registered' });
};

const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
  
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send({ error: 'Invalid credentials' });
    }
  
    const token = jwt.sign(
      { _id: user._id, role: user.role },  
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  
    res.send({ token });
  };
  

module.exports = { register, login };