const bcrypt = require('bcrypt');
const userSchema = require('../validations/userValidation');
const userService = require('../services/userService');

exports.createUser = async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const { data, error: dbError } = await userService.createUser({
      ...req.body,
      password: hashedPassword
    });

    if (dbError) {
      return res.status(400).json({ error: dbError.message });
    }

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllUsers = async (req, res) => {
  const { data, error } = await userService.getAllUsers();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

exports.getUserById = async (req, res) => {
  const { data, error } = await userService.getUserById(req.params.id);
  if (error) return res.status(404).json({ error: 'User not found' });
  res.json(data);
};

exports.updateUser = async (req, res) => {
  const { data, error } = await userService.updateUser(req.params.id, req.body);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

exports.deleteUser = async (req, res) => {
  const { error } = await userService.deleteUser(req.params.id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'User deleted successfully' });
};
