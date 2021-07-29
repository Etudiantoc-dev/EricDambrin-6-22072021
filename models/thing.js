const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const thingShema = mongoose.Schema({
    title:{type : String, required :true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
    price: { type: Number, required: true },

});

module.exports = mongoose.model('thing', thingShema); // Base qui va Servir à implémentater l'enregistrement de nouveaux objets dans la base de donné et la lecture de tous les objets en vente
