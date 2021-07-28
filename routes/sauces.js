const express = require('express');

const router = express.Router();//methode routeur d'express pour faire router.post au lieu de add.post par exemple
const saucesCtrl = require ('../controllers/sauces')

router.post('/', saucesCtrl.createThing);
router.put('/:id',saucesCtrl.modifyThing);
router.delete('/:id', saucesCtrl.deleteThing);
router.get('/:id', saucesCtrl.getOneSauce);
router.get("/", saucesCtrl.getAllSauces);


module.exports = router;