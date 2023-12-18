// Importation express
const express = require('express');

// Création de l'application express
const app = express();

// fonction qui reçoit la requete et renvoie la réponse
app.use((req, res) => {
    res.json({ message: 'Votre requête a bien été reçue !' });
});

// Exportation de l'application pour y accéder depuis les autres fichiers du projet (notemment le serveur node)
module.exports = app;