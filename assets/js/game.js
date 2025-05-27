/*
    2c = 2 de clubs 
    2d = 2 de diamonds
    2h = 2 de hearts
    2s = 2 de spades
*/


let deck = [];
const types = ['C','D','H','S'];
const specials = ['A','J','Q','K'];

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

    console.log(deck);
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}

createDeck();