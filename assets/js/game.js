/*
    2c = 2 de clubs 
    2d = 2 de diamonds
    2h = 2 de hearts
    2s = 2 de spades
*/


let deck = [];
const types = ['C','D','H','S'];
const specials = ['A','J','Q','K'];


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
    console.log(deck);
    //console.log(card);
    return '2C';
}

orderCard();