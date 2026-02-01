const bcrypt = require('bcrypt');
const supabase = require('../config/supabase');

// SIGNUP
exports.signupUser = async (req, res) => {
  try {
    const { name, email, age, location, password } = req.body;

    if (!name || !email || !age || !location || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { error } = await supabase.from('users').insert([
      { name, email, age, location, password: hashedPassword }
    ]);

    if (error) {
      if (error.code === '23505') {
        return res.status(409).json({ message: 'Email already exists' });
      }
      throw error;
    }

    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// PROFILE
exports.getUserProfile = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ message: 'Name query parameter required' });
    }

    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, age, location')
      .eq('name', name)
      .single();

    if (error || !data) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
