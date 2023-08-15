//1. Deposit some money 
//2. Determine number of lines to bet on
//3. Collect a bet amount
//4. spin the slot machine
//5.Check if the user won 
//6. Give the user their winnings 
//7. Play again

// function deposit() {
// } this is the old way to set a function

const prompt = require("prompt-sync")();

//this is the new preferred way to set a function
//1. Deposit some money 
const deposit = () => {
    while(true) { 
    const depositAmount = prompt('Enter a deposit amount: ')
    const numberDepositAmount = parseFloat(depositAmount); //converts the entered above into a number

    //see if it's a valid number
    if(isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
        console.log("Invalid deposit amount, try again.");
    }else{
        return numberDepositAmount;
    }
 }
}

//2. Determine number of lines to bet on
const getNumberOfLines = () => {
    while(true) { 
        const lines = prompt('Enter the number of lines to bet on (1-3): ')
        const numberOfLines = parseFloat(lines); //converts the entered above into a number
    
        //see if it's a valid number
        if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid number of lines, try again.");
        }else{
            return numberOfLines;
        }
     }
}

////3. Collect a bet amount
const getBet = (balance, lines) => {
    while(true) { 
        const bet = prompt('Enter the bet per line: ')
        const numberBet = parseFloat(bet); //converts the entered above into a number
    
        //see if it's a valid number
        if(isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
            console.log("Invalid bet, try again.");
        }else{
            return numberBet;
        }
     }
}



let balance = deposit();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines);