const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
;

const sauceShema = mongoose.Schema({
    // _id:{type: String, required: true }, //Mettre ou pas??
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: [String], default: [] }, // sous forme de tableau
    usersDisliked: { type: [String], default: [] },// sous forme de tableau
});

module.exports = mongoose.model('sauce', sauceShema); // Base qui va Servir à implémenter l'enregistrement de nouveaux objets dans la base de donné 
