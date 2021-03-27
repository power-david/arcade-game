// state
const initialState = {
    players: ['x', 'o'],

    currentPlayer: null,

    winner: null,

    // multi-dimensional array
    board: [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]
  }

let gameState

  //in a multi-dimensional array, to get the 1st square on the 2nd row
  //intitialState.board[1][0]

  //in buildInitialState, current player is whomever is 
  //in the 0 position of gameState.players, swap after each play
  
function buildInitialState() {
    gameState = JSON.parse(JSON.stringify(initialState))
    renderState()
}

// render
function renderState() {
    const app = $('#app')
    app.empty()

    gameState.board.forEach(function(row, rowIndex) {
        row.forEach(function(square, squareIndex) {
           
            const squareElement = $(
            `<div class="square" data-row="${rowIndex}" data-square="${squareIndex}">${square}</div>`)
            app.append(squareElement)
        })
    })
}

// maybe a dozen or so helper functions for tiny pieces of the interface

// listeners
function onSquareClick() {
if ($(this).text().trim() === "" && gameState.winner === null) {
    const row = $(this).data("row")
    const square = $(this).data("square")

    gameState.board[row][square] = selectPlayer()
    // gameState.board[row][square] = 'o'
    //is this a winning space?
   
    renderState()
    checkForWinner()
}

    if (gameState.winner) {
        const winnerElement = $(`<div>${gameState.winner} is the winner!</div>`)
        $('footer').append(winnerElement)


        // alert(`${gameState.winner} is the winner!`)
        // resetGame()
    }

    
 // update state, maybe with another dozen or so helper functions...

//   renderState() // show the user the new state
}

//functions to create

//1. Take turns placing marks in empty spaces (see onSquareClick)

function selectPlayer() {
    if (gameState.currentPlayer == 'x' ) {
        gameState.currentPlayer = 'o'
    } else {
        gameState.currentPlayer = 'x'
    }
    return gameState.currentPlayer
}

//3. Notify when a move results in a win or draw

//4. Disable user clicking when a game is over, allow user to reset game when game is over

$('#reset').click(function() {
    resetGame()
})

//5. Reset game without resetting browser

function resetGame() {
    // renderState()
    buildInitialState()
}

//6. Check for a winner after each play

function checkForWinner() {
    let board = gameState.board
    if (
        (board[0][0] == gameState.currentPlayer && board[0][1] == gameState.currentPlayer && board[0][2] == gameState.currentPlayer)
        // (board[1][0] && board[1][1] && board[1][2]) ||
        // (board[2][0] && board[2][1] && board[2][2]) ||
        // (board[0][0] && board[1][0] && board[2][0]) ||
        // (board[0][1] && board[1][1] && board[2][1]) ||
        // (board[0][2] && board[1][2] && board[2][2]) ||
        // (board[0][0] && board[1][1] && board[2][2]) ||
        // (board[0][2] && board[1][1] && board[2][0]) 
    ){
        console.log("Current player is the winner", gameState.currentPlayer)
        gameState.winner = gameState.currentPlayer

        //notify which player has won, reset board, and change button to play again
    }
}

buildInitialState()

renderState()
$('#app').on('click', '.square', onSquareClick); // etc