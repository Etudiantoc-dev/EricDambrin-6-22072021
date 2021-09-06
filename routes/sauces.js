const express = require('express');
const router = express.Router();//methode routeur d'express pour faire router.post au lieu de add.post par exemple

const saucesCtrl = require ('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer.config');

router.post('/', auth, multer, saucesCtrl.createThing);//Création
router.get('/:id', auth, saucesCtrl.getOneSauce);//renvoie la sauce avec l'ID fourni
router.get("/", auth, saucesCtrl.getAllSauces);//renvoie le tableau de toutes les sauces
router.put('/:id', auth, multer, saucesCtrl.modifyThing); // Modification
router.delete('/:id', auth, saucesCtrl.deleteThing);//suppression



module.exports = router;