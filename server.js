const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');

const app = express();
const port = 3000;
const url = 'mongodb://localhost:27017';
const dbName = 'cine';
const collectionName = 'peliculas';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

let db;
(async function () {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    await client.connect();
    console.log('Conexión establecida con la base de datos');
    db = client.db(dbName);
})();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/peliculas', async (req, res) => {
    const movies = await db.collection(collectionName).find({}).toArray();
    res.json(movies);
});

app.post('/peliculas', async (req, res) => {
    const movieData = req.body;
    
    await db.collection(collectionName).insertOne(movieData);
    res.redirect('/');
});

app.put('/peliculas/:id', async (req, res) => {
    const id = req.params.id;
    const newData = req.body;
    await db.collection(collectionName).updateOne({ _id: ObjectID(id) }, { $set: newData });
    res.redirect('/');
});

app.delete('/peliculas/:id', async (req, res) => {
    const id = req.params.id;
    await db.collection(collectionName).deleteOne({ _id: ObjectID(id) });
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});


