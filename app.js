const express = require('express');
const morgan = require('morgan');
const favicon = require ('serve-favicon');
const { success, getUniqueId } = require('./helper.js')
const bodyParser = require('body-parser');
let pokemons = require('./mock-pokemon');

const app = express();
const port = 3000;

app
    .use(favicon(__dirname + '/favicon.ico')) 
    .use(morgan('dev'))
    .use(bodyParser.json())

app.get('/', (req,res) => res.send('Hello again Express !'));



//http://localhost:3000/api/pokemons/5

app.get('/api/pokemons/:id', (req,res) =>  {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(pokemon => pokemon.id === id);
    const message = 'Un pokémon a bien été trouvé';
    res.json(success(message,pokemon));
});



// http://localhost:3000/api/pokemons

app.get('/api/pokemons' , (req,res) => {
    const message = 'Voici la liste des pokémons'; 
    res.json(success(message,pokemons));
});


// http://localhost:3000/api/pokemons
app.post('/api/pokemons', (req, res) => {
    const id = getUniqueId(pokemons);
    const pokemonCreated = { ...req.body,...{id:id, created: new Date()}};
    pokemons.push(pokemonCreated);
    const message = `Le pokemon ${pokemonCreated.name} a bien été créé.`
    res.json(success(message, pokemonCreated))
})


//http://localhost:3000/pokemons/1
app.put('/api/pokemons/:id', (req,res)=>{
    const id = parseInt(req.params.id);
    const pokemonUpdated = {...req.body,id:id};
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === id ? pokemonUpdated :pokemon
    });
    const message = `Le pokemon ${pokemonUpdated.name} a bien été modifié.`;
    res.json(success(message,pokemonUpdated))
})

app.delete('/api/pokemons/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const pokemonDeleted = pokemons.find(pokemon => pokemin.id === id);
    pokemons.filter(pokemon => pokemon.id !== id);
    const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé.`;
    res.json(success(message, pokemonDeleted));

})






app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`));