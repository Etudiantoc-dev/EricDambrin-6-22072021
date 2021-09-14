const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');


router.post('/signup', userCtrl.signup); //Route Post car le frontend enverra des informations également adresse mail et mot de passe
router.post('/login', userCtrl.login);

module.exports = router;