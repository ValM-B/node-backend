// Importation express
const express = require('express');

// Création de l'application express
const app = express();

// next renvoie à la prochaine fonction
app.use((req, res, next) => {
    console.log('Requête reçue !');
    next();
});

app.use((req, res, next) => {
    res.status(201);
    next();
});

// fonction qui reçoit la requete et la réponse
// next renvoie à la prochaine fonction
app.use((req, res, next) => {
    res.json({ message: 'Votre requête a bien été reçue !' });
    next();
});

app.use((req, res, next) => {
    console.log('Réponse envoyée avec succès !');
});

// Exportation de l'application pour y accéder depuis les autres fichiers du projet (notemment le serveur node)
module.exports = app;