// Importation express
const express = require('express');

// Création de l'application express
const app = express();

// // next renvoie à la prochaine fonction
// app.use((req, res, next) => {
//     console.log('Requête reçue !');
//     next();
// });

// app.use((req, res, next) => {
//     res.status(201);
//     next();
// });

// // fonction qui reçoit la requete et la réponse
// // next renvoie à la prochaine fonction
// app.use((req, res, next) => {
//     res.json({ message: 'Votre requête a bien été reçue !' });
//     next();
// });

// //le dernier middleware n'a pas de next car il n'y a pas de fonction suivante
// app.use((req, res) => {
//     console.log('Réponse envoyée avec succès !');
// });

app.use('/api/stuff', (req, res, next) => {
    const stuff = [
        {
            _id: 'oeihfzeoi',
            title: 'Mon premier objet',
            description: 'Les infos de mon premier objet',
            imageUrl: '',
            price: 4900, // prix en centimes pour ne pas utiliser les nombres à virgule
            userId: 'qsomihvqios',
        },
        {
            _id: 'oeihfzeomoihi',
            title: 'Mon deuxième objet',
            description: 'Les infos de mon deuxième objet',
            imageUrl: '',
            price: 2900,
            userId: 'qsomihvqios',
        },
    ];
    res.status(200).json(stuff); // renvoie le tableau stuff avec le code 200
});
// Exportation de l'application pour y accéder depuis les autres fichiers du projet (notemment le serveur node)
module.exports = app;