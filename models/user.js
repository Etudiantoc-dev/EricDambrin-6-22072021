const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');// Pour que l'utilisateur ne puisse s'enregistrer qu'avec une seule adresse

const userShema = mongoose.Schema({ //Shéma de données pour l'inscription et la connection
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

userShema.plugin(uniquevalidator);
module.exports = mongoose.model('User', userShema);// exporte et rend le shéma disponible pour l'application Express