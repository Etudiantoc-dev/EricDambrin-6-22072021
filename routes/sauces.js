const express = require('express');
const router = express.Router();//methode routeur d'express pour faire router.post au lieu de app.post par exemple
const saucesCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer.config');

router.post('/', auth, multer, saucesCtrl.createSauce);//Création 
router.get('/:id', auth, saucesCtrl.getOneSauce);//renvoie la sauce avec l'ID fourni
router.get('/', auth, saucesCtrl.getAllSauces);//renvoie le tableau de toutes les sauces
router.put('/:id', auth, multer, saucesCtrl.modifySauce); // Modification
router.delete('/:id', auth, saucesCtrl.deleteSauce);//suppression
router.post('/:id/like', auth, saucesCtrl.likeSauce);


module.exports = router;