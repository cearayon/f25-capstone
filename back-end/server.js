//boilerplate for server setup//
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
app.use(express.json());
app.use(cors());
//end boilerplate code for server//

//import controller functions//
const {sendGames, createGame, updateGame, deleteGame} = require('./controller.js')
//import complete

//heroku boilerplate
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../front-end/index.html'))
})

app.get('/css', (req, res) => {
    res.sendFile(path.join(__dirname, '../front-end/styles.css'))
})

app.get('/js', (req, res) => {
    res.sendFile(path.join(__dirname, '../front-end/index.js'))
})


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