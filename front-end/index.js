
const gamesContainer = document.querySelector('#games-container')
const form = document.querySelector('form')
const ad = document.getElementsByClassName('ad')

const baseURL = `/api/games`

const gamesCallback = ({data: games}) => displayGames(games)
const errCallback = err => console.log(err.response.data)

const getAllGames = () => axios.get(baseURL).then(gamesCallback).catch(errCallback);
const createGame = body => axios.post(baseURL, body).then(gamesCallback).catch(errCallback);
const updateGame = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(gamesCallback).catch(errCallback);
const deleteGame = id => axios.delete(`${baseURL}/${id}`).then(gamesCallback).catch(errCallback);

function submitHandler(e) {
    e.preventDefault();

    let title = document.querySelector('#title');
    let genre = document.querySelector('#genre');
    let imageURL = document.querySelector('#imageURL');
    let rating = document.querySelector('input[name="ratings"]:checked');
    let comment = document.querySelector('#game-text-review');
    console.log(comment.value)
    let bodyObj = {
        title: title.value,
        genre: genre.value,
        imageURL: imageURL.value,
        rating: rating.value,
        comment: comment.value
    }

    createGame(bodyObj)

    title.value = ''
    genre.value = ''
    imageURL.value = ''
    rating.checked = false
    comment.value = ''
    
}

function createGameCard(game) {
    const gameCard = document.createElement('div')
    gameCard.classList.add('game-card')

    gameCard.innerHTML = `<div class="flip-card"><div class="flip-card-inner"<div class="flip-card-front">
     <img alt ='game cover' src=${game.imageURL} class="game-cover"/>
     </div>
    
    <div class="flip-card-back">
    <p class="game-title">${game.title}</p>
    <p class="genre">${game.genre}</p>
    <p class="comment">${game.comment}</p>
    <div class="btns-container">
        <button onclick="updateGame(${game.id}, 'minus')">-</button>
        <p class="game-rating">${game.rating} stars</p>

        <button onclick="updateGame(${game.id}, 'plus')">+</button>
        </div>
        <br>
        <button onclick="deleteGame(${game.id})">remove card</button>
        </div>
        </div>
        </div>`

        gamesContainer.appendChild(gameCard)
        
}

function displayGames(arr) {
    gamesContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createGameCard(arr[i])
    }
}

function adClick(){
    axios.get('https://api.adviceslip.com/advice')
    .then((response) => {
        console.log(response.data.slip.advice)
        let advice = response.data.slip.advice
        alert(`${advice}`)
    })
}

for(let i =0; i< ad.length; i++){
    ad[i].addEventListener('click', adClick)
}

getAllGames()
form.addEventListener('submit', submitHandler)
