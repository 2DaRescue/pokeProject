const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json()); // Middleware to parse JSON

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.PokemonDB)
.then(() => console.log("✅ Connected to MongoDB (Pokémon DB)"))
.catch(err => console.error("❌ MongoDB connection error:", err));


// Load the JSON file
const filePath = path.join(__dirname, 'Data', 'pokedex.json');
const pokemonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));


app.get('/', (req, res) => {
    res.send('Welcom to my Simple pokemon API!!!!');
  });
  
// Get all Pokémonas
app.get('/pokemon', (req, res) => {
    res.json(pokemonData);
});

// Get a Pokémon by English name (case-insensitive)
app.get('/pokemon/name/:name', (req, res) => {

    const { name } = req.params;
    const pokemon = pokemonData.find(p => p.name.english.toLowerCase() === name.toLowerCase());

    if (pokemon) {
        res.json(pokemon);
    } else {
        res.status(404).json({ error: "Pokémon not found" });
    }
});

// Get Pokémon by id (e.g., /pokemon/id/151) = mew
app.get('/pokemon/id/:id',(req, res)=>{
    const {id} = req.params
    const pokemon = pokemonData.find( p=>p.id === parseInt(id) )
    if(pokemon){
        res.json(pokemon)
    }
    else 
    res.status(404).json({error:"NOPSIES"})
})



// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Pokémon API running on port ${PORT}`));
