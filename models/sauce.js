const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);


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
    usersLiked: { type: [String], default: [] }, 
    usersDisliked: { type: [String], default: [] },
});

module.exports = mongoose.model('sauce', sauceShema); // // export et rend le shéma disponible pour l'application Express
