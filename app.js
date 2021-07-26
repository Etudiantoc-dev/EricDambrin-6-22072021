const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Eric:Dbmongoose@cluster0.1da6l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  const express = require('express');
const app = express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use("/api/sauces", (req, res, next) =>{
    const sauces = [
        {
        id: '1',
        userId:'',
        name:'',
        manufacturer:'',
        descripttion:'',
        mainPepper:'',
        imageUrl:'',
        },
        
    ];
    res.status(200).json(sauces);
});



module.exports = app;