
//Manages the Game of Tic-Tac-Toe it has 2 player's take turns marking squares, checks for the winner and restarts the game.
class Game {
    constructor() {
        this.currentPlayer = 'X'; 

        this.squares = [];
        for(let i = 0; i < 9 ; i++) {
            this.squares.push(null);
        }
        
        this.winningRows = [
            [0,1,2], //Rows
            [3,4,5],
            [6,7,8],
            [0,3,6], //Columns
            [1,4,7], 
            [2,5,8],
            [0,4,8], //Diagonals
            [2,4,6]
       ];

        this.makeBoard();
        this.setupRestartButton();
        $('#alertWinner,#alertDraw').hide();
      
    }


    // When a square in the board is clicked , it triggers the playersTurn() method 
    makeBoard() {
        $('.square').each((index, element) => {
            $(element).on('click', () => {
                this.playersTurn($(element), index);
            });
        });
    }

    //Handles the current players turn by marking the square with X or O, updates the turn indicator, & checks for the winner or a draw.
    playersTurn(square, num) {
        if (this.squares[num]) return; 

        this.squares[num] = this.currentPlayer; 
        square.text(this.currentPlayer); 

        
        
        let playersTurn = document.getElementById('players-turn');

        if(playersTurn.innerHTML === "Player 2's Turn") {
            playersTurn.innerHTML = "Player 1's Turn";
        }else{
            playersTurn.innerHTML = "Player 2's Turn";
        }
    

        if (this.currentPlayer === 'X') {
            this.currentPlayer = 'O';
        } else {
            this.currentPlayer = 'X';
        }
        this.checkWinner();
        
    }

    
//Checks the current game state for a winner or a draw. 
   checkWinner() {

    for (const row of this.winningRows) {
        const [a, b, c] = row;
        if (this.squares[a] && this.squares[a] === this.squares[b] && this.squares[a] === this.squares[c]) {
            const winningLetter = this.squares[a]; 
            let winningPlayer ; 
            if (winningLetter === "X") {
                winningPlayer = 'Player 1';
            }else {
                winningPlayer = 'Player 2';
            }
            const alertElement = $('#winner');
            alertElement.text(`${winningPlayer} wins!`); 
            $('#alertWinner').show(); 
            return winningPlayer;
        }
    }
    
    let filledSquares = 0;

    for (let square of this.squares) {
    if (square !== null) {
        filledSquares++;
    }
}
    if (filledSquares === 9) {
        $('#alertDraw').show(); 
        return 'Draw';
    }
    return null; 
}


    //Resets the Game state (clear squares,turn indicatior,resets current player, & hide alerts).
    restartGame() {
        this.squares.fill(null);
        $('.square').text('');
        this.currentPlayer = 'X';
        $('#players-turn').text("Player 1's Turn");
        $('.alert').hide(); 
    }

    // Event listner is set up & calls the restartGame method when clicked to reset the game
    setupRestartButton() {
       
        $('#restart-button').on('click', () => {
            this.restartGame();
        })
    }
}

const game = new Game();
