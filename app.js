const express = require('express');
const app = express();

app.use((req, res, next) =>{//le premier enregistre « Requête reçue ! » dans la console et passe l'exécution ;
 console.log('requête reçu !');
 next();
});

app.use((req, res, next)=>{//le deuxième ajoute un code d'état 201 à la réponse et passe l'exécution ;
    res.status(201);
    next();
});


app.use((req, res, next) =>{//le troisième envoie la réponse JSON et passe l'exécution ;
    res.json({message : 'Votre requête a bien été reçue '});
    next();
})
app.use((req,res)=>{//le dernier élément de middleware enregistre « Réponse envoyée avec succès ! » dans la console.
    console.log('Réponse envoyé avec succés !')
})

module.exports = app;