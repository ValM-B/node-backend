// Importation express
const express = require('express');

// Création de l'application express
const app = express();

// Exportation de l'application pour y accéder depuis les autres fichiers du projet (notemment le serveur node)
module.exports = app;