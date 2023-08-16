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

//defining some variables that are going to depict how big the slot machine is and how many symbols we can potentially have in each row
//this defines the num of rolls and symbols 
//this is a global variable
const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8,
};

//multiplier of each symbol
const SYMBOL_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
};

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
};

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
};

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
};

//4. spin the slot machine
const spin = () => {
    //first figure out how many symbols we have (a, b, c, d)
    // we put all of the possible symbols that we could use inside of a list or inside of an array, 
    // and then we are going to randomly select them out of the array and remove them from the array every single time that we use them while we are generating each reel
    //generating individual columns
    const symbols = []; //having an array allows us to use const as it doesn't change the variable just manipulates what's inside the array
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol); //this pushes them into the array of const symbols, PUSH inserts an element into an array
        }
    }

    const reels = [];
    for (let i = 0; i < COLS; i++){
            reels.push([]); //for every single reel or COLS we have we add one inside const reels 
        const reelSymbols = [...symbols]; //this copies the symbols that we have available to choose for each reel into another array
        for(let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length); //math.random generates a random number between 0-1, then we take that number and * it by whatever the length of our reelSymbols is 
                const selectedSymbol = reelSymbols[randomIndex];
                reels[i].push(selectedSymbol);
                reelSymbols.splice(randomIndex, 1)
        }
    }

    return reels
};

//explanation for above
//1. Generate an array of all of the available symbols that we can pick from when we are going to randomly choose what's inside of each reel (line 82)
//2. Then we create an array (line 94) kind of temporary array so we have 3 reels
//3. We loop through (line 95) all of the reels that we have which is represented by the number of COLS  
//4. Then we copy all of the available symbols (line 97) 
//5. Then we loop through all of the ROWS (line 98), all of the row is the number of symbols that we are going to have in each reel 
//6. Then we randomly generate (line 99) one of the available symbols, we take it and insert it into our reel (line 100)
//7. We push it to reel which is represented by i 
//8. Finally, we remove that from the available symbols so we don't select them again 


//5.Check if the user won 
//now we have columns we need an array for the rows
//we have: [[A B C]], [[D D D]], [[A A A]]
//what we need:
//[A D A]
//[B D A]
//[C D A]
const transpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for(let j = 0; j < COLS; j++) {
            //now for every column that we have we're going to grab the element that's in the 1st row in that col and push it into our rows
            rows[i].push(reels[j][i]);
        }
    }

    return rows
};

const printRows = (rows) => {
    for (const row of rows) { //going through every single row in our rows
        let rowString = ""; //giving us an array that will be representing the elements in that row
        for(const [i, symbol] of row.entries()){ //we loop through the i and the symbol that exists in this row (if we have A i=0 symbol=A so on)
            rowString += symbol
            if (i != row.length - 1){
                rowString += " | "
            }
        }
        console.log(rowString);
    }
};

//winnings 
const getWinnings = (rows, bet, lines) => { //the bet here is the bet per line
    let winnings = 0;

    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) { //we loop through every single symbol that we have
            if (symbol != symbols[0]) { //if every symbol that we have is the same as the 1st symbol, meaning we didn't win
                allSame = false;
                break;
            }
        }

        if (allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]]
        }
    }

    return winnings;
};

//6. Give the user their winnings 
const game = () => {
    let balance = deposit();

    while (true) {
        console.log("You have a balance of $" + balance);
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
            balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
            const winnings = getWinnings(rows, bet, numberOfLines); 
            balance += winnings;
        console.log("You won, $" + winnings.toString());

        if (balance <= 0) {
            console.log("You ran out of money!");
            break;
        }
        const playAgain = prompt("Do you want to play again (y/n)? ");

        if (playAgain != "y") break;
    }
};

game();



