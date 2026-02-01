const express = require('express');
const router = express.Router();

const {
  signupUser,
  getUserProfile
} = require('../controllers/authController');

router.post('/signup', signupUser);
router.get('/myprofile', getUserProfile);

module.exports = router;
