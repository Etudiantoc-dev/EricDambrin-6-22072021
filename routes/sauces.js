const express = require('express');
const router = express.Router();//methode routeur d'express pour faire router.post au lieu de add.post par exemple

const saucesCtrl = require ('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer.config');

router.post('/', auth, multer, saucesCtrl.createThing);
router.put('/:id', auth, multer, saucesCtrl.modifyThing);
router.delete('/:id', auth, saucesCtrl.deleteThing);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.get("/", auth, saucesCtrl.getAllSauces);


module.exports = router;