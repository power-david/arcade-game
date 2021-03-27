// state
const initialState = {
    players: ['x', 'o'],

    // multi-dimensional array
    board: [
      ['', '', 'x'],
      ['x', 'o', ''],
      ['', 'o', '']
    ]
  }


  //in a multi-dimensional array, to get the 1st square on the 2nd row
  //intitialState.board[1][0]
function buildInitialState() {
    renderState()
}

// render
function renderState() {
    const app = $('#app')
    app.empty()

    initialState.board.forEach(function(row, rowIndex) {
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
if ($(this).text().trim() === "") {
    const row = $(this).data("row")
    const square = $(this).data("square")

    initialState.board[row][square] = 'x'
    // initialState.board[row][square] = 'o'
    //is this a winning space?
   
    renderState()
}
    
 // update state, maybe with another dozen or so helper functions...

//   renderState() // show the user the new state
}

function checkForWinner() {
    let board = initialState.board
    if (
        (board[0][0] && board[0][1] && board[0][2]) ||
        (board[1][0] && board[1][1] && board[1][2]) ||
        (board[2][0] && board[2][1] && board[2][2]) ||
        (board[0][0] && board[1][0] && board[2][0]) ||
        (board[0][1] && board[1][1] && board[2][1]) ||
        (board[0][2] && board[1][2] && board[2][2]) ||
        (board[0][0] && board[1][1] && board[2][2]) ||
        (board[0][2] && board[1][1] && board[2][0]) 
    ){
        //notify which player has won, reset board, and change button to play again
    }
}

buildInitialState()

renderState()
$('#app').on('click', '.square', onSquareClick); // etc