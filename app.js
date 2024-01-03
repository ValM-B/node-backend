// Importation express
const express = require('express');
const mongoose = require('mongoose');

const Thing = require('./models/Thing');

// Création de l'application express 


// Importation de mongoose
mongoose.connect('mongodb+srv://valmb_33:ktsEO5l0wWB40uym@cluster0.pfwvwbh.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();    
// Middleware qui intercepte les requettes qui contiennent du JSON et envoyé à req.body (fait avant avec body-parser)
app.use(express.json());

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

//pas de endpoint car on veut que ce middleware soit exécuté pour toutes les requêtes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // accès à l'API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // ajout des headers mentionnés aux requêtes envoyées vers l'API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // envoi des requêtes avec les méthodes mentionnées
    next();
});

//création d'un middleware avec un endpoint pour créer une route POST
app.post('/api/stuff', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
      ...req.body
    });
    thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
});

//création d'un middleware avec un endpoint pour créer une route GET
app.get('/api/stuff', (req, res, next) => {
    const stuff = [
        {
            _id: 'oeihfzeoi',
            title: 'Mon premier objet',
            description: 'Les infos de mon premier objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2014/11/22/00/51/camera-541213_1280.jpg',
            price: 4900, // prix en centimes pour ne pas utiliser les nombres à virgule
            userId: 'qsomihvqios',
        },
        {
            _id: 'oeihfzeomoihi',
            title: 'Mon deuxième objet',
            description: 'Les infos de mon deuxième objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2014/11/22/00/51/camera-541213_1280.jpg',
            price: 2900,
            userId: 'qsomihvqios',
        },
    ];
    res.status(200).json(stuff); // renvoie le tableau stuff avec le code 200
});
// Exportation de l'application pour y accéder depuis les autres fichiers du projet (notemment le serveur node)
module.exports = app;