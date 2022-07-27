//here we import the db info from our json file to use the information in there
const games = require('./db.json')
let globalId = 4

//export the controller functions for use in our server file

module.exports = {
    sendGames: (req,res) => {
        res.status(200).send(games)
    },

    createGame: (req,res) => {
        const {name, rating, imageURL, genre, comment} = req.body

        let newGame= {
            name,
            rating,
            imageURL,
            genre,
            comment,
            id: globalId
        }
        games.push(newGame)
        res.status(200).send(games)
        globalId++
    },

    updateGame: (req, res) => {
        const existingId = +req.params.id
        let index = games.findIndex(game => game.id === existingId)
        
        if(req.body.type === 'plus'){
            if(games[index].rating >= 5){
                res.status(400).send('Cannot rate game beyond 5.');
            } else {
                games[index].rating++;
                res.status(200).send(games)
            }
        } else {
            if(games[index].rating <= 1){
                res.status(400).send('Cannot rate game below 1.');
            } else {
                movies[index].rating--;
                res.status(200).send(games)
            }
        }
    },

    deleteGame: (req, res) => {
        const existingId = +req.params.id
        
        let index = games.findIndex(game => game.id === existingId);
        games.splice(index, 1);
        res.status(200).send(games);
    }

}
