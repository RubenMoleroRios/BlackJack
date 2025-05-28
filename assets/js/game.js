const myModule = (() => {
    'use strict';
    
    let deck = [];
    const types = ['C','D','H','S'], specials = ['A','J','Q','K'] ,blackjack = 21;

    //let playerPoints = 0, computerPoints = 0;
    let playersPoints = [];

    //Referencias del html
    const btnOrderCard = document.querySelector('#btnOrderCard'),
          btnStopGame = document.querySelector('#btnStopGame'),
          btnNewGame = document.querySelector('#btnNewGame');
    
    const pointsHTML = document.querySelectorAll('small'),
          divCartasJugadores = document.querySelectorAll('.divCards');
        //   divPlayerCards = document.querySelector('#player-cards'),
        //   divComputerCards = document.querySelector('#computer-cards');

    
    const initializeGame = (numPlayers = 2) => {
        deck = createDeck();
        playersPoints = [];
        for (let i = 0; i < numPlayers; i++){
            playersPoints.push(0);
        }

        pointsHTML.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerText = '');

        btnOrderCard.disabled = false;
        btnStopGame.disabled= false;

    };

    //función para crear una baraja nueva
    const createDeck = () =>{

        deck = [];
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
        return _.shuffle(deck);
    };
    
    //Esta funcion permite pedir una carta
    const orderCard = () => {
        
        if(deck.length === 0){
            throw 'No hay cartas en el deck';
        }

        return deck.pop();
    };

    const valorCard = (card) => {
        const valor = card.substring(0,card.length -1 );
        //Si la carta no es un número y es A vale 11 si no es A vale 10, si la carta es un número, multiplica el valor por 1 para que el 
                                                                //string se convierta en número
        return (isNaN ( valor )) ? ( (valor === 'A') ? 11 : 10 ) : valor * 1 ;
        
    };

    //turno: 0 = primer jugador y el último es la banca
    const accumulatePoints = (card,turn) => {
        playersPoints[turn] = playersPoints[turn] + valorCard(card);
        pointsHTML[turn].innerText = playersPoints[turn];

        return playersPoints[turn];

    };

    const createCard = (card, turn) => {
        const imgCard = document.createElement('img');
            imgCard.src = `cartas/${card}.png`;
            imgCard.classList.add('cards');
            divCartasJugadores[turn].append(imgCard);
    };

    const whoWin = () => {
        const [minPoints,computerPoints] = playersPoints;
        setTimeout(() => {
            if(computerPoints === minPoints){
                alert('Se ha empatado');
            }else if ((minPoints === blackjack) && (computerPoints!= blackjack) || (computerPoints > blackjack) && ((minPoints<computerPoints)) ){
                alert('Jugador Gana');
            }else {
                alert('Gana la banca');
            }
        }, 100 );
    };

    //turno del ordenador
    const computerTurn = (minPoints) =>{
        let computerPoints = 0;
        do {
            const card = orderCard();
            computerPoints = accumulatePoints(card, playersPoints.length-1);
            createCard(card, playersPoints.length-1);

        }while ((computerPoints < minPoints) && (minPoints <= 21));

        whoWin();
    };

    //Events
    btnOrderCard.addEventListener('click',() => {

        const card = orderCard();
        const pointPlayer = accumulatePoints(card,0);

        createCard(card, 0);

        if( pointPlayer > 21){
            console.warn('Lo siento has perdido');
            btnOrderCard.disabled = true;
            btnStopGame.disabled = true;
            computerTurn(pointPlayer);
        }else if ( pointPlayer === 21){
            console.warn('21 genial!');
            btnOrderCard.disabled = true;
            btnStopGame.disabled = true;
            computerTurn(pointPlayer);
        }

    });

    btnStopGame.addEventListener('click', () => {
        btnOrderCard.disabled = true;
        btnStopGame.disabled = true;
        computerTurn(playersPoints[0]);
    });

    btnNewGame.addEventListener('click',() => {
        initializeGame();
    });
        
    return{
        nuevoJuego: initializeGame
    };

})();
