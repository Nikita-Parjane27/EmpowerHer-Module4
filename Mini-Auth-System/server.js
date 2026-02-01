require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const { createClient } = require('@supabase/supabase-js');
const authroutes = require('./routes/authroutes');

const app = express();
app.use(express.json());

app.use('/', authroutes);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});