//boilerplate for server setup//
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
require('dotenv').config();
app.use(express.json());
app.use(cors());
//end boilerplate code for server//

//import controller functions//
app.use('/', express.static(path.join(__dirname , '../front-end')))

const {sendGames, createGame, updateGame, deleteGame} = require('./controller.js')
//import complete

//endpoints for our requests//
app.get('/api/games', sendGames);
app.post('/api/games', createGame);
app.put('/api/games/:id', updateGame);
app.delete('/api/games/:id', deleteGame);
//endpoints complete//

//port stuff boilerplate//
const port = process.env.PORT || 5500
app.listen(port, () => {
    console.log(`in at port ${port} boyooooo`)
})
//port boilerplate complete//