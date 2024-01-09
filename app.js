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

//création d'un middleware avec un endpoint pour créer une route PUT
app.put('/api/stuff/:id', (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});

//création d'un middleware avec un endpoint pour créer une route DELETE
app.delete('/api/stuff/:id', (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});

//création d'un middleware avec un endpoint pour créer une route GEt pour récupérer un seul objet selon son id
app.get('/api/stuff/:id', (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
});

//création d'un middleware avec un endpoint pour créer une route GET
app.get('/api/stuff', (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
});


// Exportation de l'application pour y accéder depuis les autres fichiers du projet (notemment le serveur node)
module.exports = app;