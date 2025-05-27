/*
    2c = 2 de clubs 
    2d = 2 de diamonds
    2h = 2 de hearts
    2s = 2 de spades
*/


let deck = [];
const types = ['C','D','H','S'];
const specials = ['A','J','Q','K'];
const blackjack = 21;

let playerPoints = 0;
let computerPoints = 0;

//Referencias del html
const btnOrderCard = document.querySelector('#btnOrderCard');
const btnStopGame = document.querySelector('#btnStopGame');
const btnNewGame = document.querySelector('#btnNewGame');
 
const pointsHTML = document.querySelectorAll('small');
const divPlayerCards = document.querySelector('#player-cards');
const divComputerCards = document.querySelector('#computer-cards');


//función para crear una baraja nueva
const createDeck = () =>{
    for ( let i = 2; i <= 10; i++){
        for(let type of types){
            deck.push( i + type);
        }
    }

    for ( let type of types){
        for (let special of specials){
            deck.push(special + type);
        }
    }

    //console.log(deck);
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}

createDeck();

//Esta funcion permite pedir una carta
const orderCard = () => {
    
    if(deck.length===0){
        throw 'No hay cartas en el deck';
    }
    const card = deck.pop();
    return card;
}

const valorCard = (card) => {
    const valor = card.substring(0,card.length -1 );
    //Si la carta no es un número y es A vale 11 si no es A vale 10, si la carta es un número, multiplica el valor por 1 para que el 
                                                            //string se convierta en número
    return (isNaN ( valor )) ? ( (valor === 'A') ? 11 : 10 ) : valor * 1 ;
    
}

//turno del ordenador
const computerTurn = (minPoints) =>{

    do {
        const card = orderCard();
        computerPoints = computerPoints + valorCard(card);
        pointsHTML[1].innerText = computerPoints;

        const imgCard = document.createElement('img');
        imgCard.src = `cartas/${card}.png`;
        imgCard.classList.add('cards')
        divComputerCards.append(imgCard)

        if(minPoints > 21){            
            break;
        }

    }while ((computerPoints < minPoints) && (minPoints <= 21));

    setTimeout(() => {
        if(computerPoints === minPoints){
            alert('Se ha empatado');
        }else if ((computerPoints > blackjack) && ((playerPoints<computerPoints))){
            alert('Jugador Gana');
        }else {
            alert('Gana la banca');
        }
    }, 100 );
}

//Events
btnOrderCard.addEventListener('click',() => {

    const card = orderCard();
    playerPoints = playerPoints + valorCard(card);
    pointsHTML[0].innerText = playerPoints;

    const imgCard = document.createElement('img');
    imgCard.src = `cartas/${card}.png`;
    imgCard.classList.add('cards')
    divPlayerCards.append(imgCard)

    if( playerPoints > 21){
        console.warn('Lo siento has perdido');
        btnOrderCard.disabled = true;
        btnStopGame.disabled = true;
        computerTurn(playerPoints);
    }else if ( playerPoints === 21){
        console.warn('21 genial!');
        btnOrderCard.disabled = true;
        btnStopGame.disabled = true;
        computerTurn(playerPoints);
    }

});

btnStopGame.addEventListener('click', () => {
    btnOrderCard.disabled = true;
    btnStopGame.disabled = true;
    computerTurn(playerPoints);
});

btnNewGame.addEventListener('click',() => {
    btnOrderCard.disabled = false;
    btnStopGame.disabled= false;
    deck = [];
    deck = createDeck();
    playerPoints = 0;
    computerPoints = 0;
    pointsHTML[0].innerText = 0;
    pointsHTML[1].innerText = 0;

    divComputerCards.innerHTML = '';
    divPlayerCards.innerHTML = '';

});