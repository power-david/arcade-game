const initialState = {
    players: ['x', 'o'],
    currentPlayer: null,
    winner: null,
    board: [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ],
  }

let gameState

function buildInitialState() {
    const footer = $('footer')
    footer.empty()
    console.log()
    gameState = JSON.parse(JSON.stringify(initialState))
    renderState()
}

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

function onSquareClick() {
    if ($(this).text().trim() === "" && gameState.winner === null) {
        const row = $(this).data("row")
        const square = $(this).data("square")

    gameState.board[row][square] = selectPlayer()
   
    renderState()
    checkForWinner()
}

    if (gameState.winner) {
        const winnerElement = $(`<div class="game-message">${gameState.winner} is the winner!</div>`)
        $('footer').append(winnerElement)
    } 
}

function selectPlayer() {
    if (gameState.currentPlayer == 'x' ) {
        gameState.currentPlayer = 'o'
    } else {
        gameState.currentPlayer = 'x'
    }
    return gameState.currentPlayer
} 

$('#reset').click(function() {
    resetGame()
})

function resetGame() {
    buildInitialState()
}

function checkForWinner() {
    let board = gameState.board
    if (
        (board[0][0] == gameState.currentPlayer && board[0][1] == gameState.currentPlayer && board[0][2] == gameState.currentPlayer) ||
        (board[1][0] == gameState.currentPlayer && board[1][1] == gameState.currentPlayer && board[1][2] == gameState.currentPlayer) ||
        (board[2][0] == gameState.currentPlayer && board[2][1] == gameState.currentPlayer && board[2][2] == gameState.currentPlayer) ||
        (board[0][0] == gameState.currentPlayer && board[1][0] == gameState.currentPlayer && board[2][0] == gameState.currentPlayer) ||
        (board[0][1] == gameState.currentPlayer && board[1][1] == gameState.currentPlayer && board[2][1] == gameState.currentPlayer) ||
        (board[0][2] == gameState.currentPlayer && board[1][2] == gameState.currentPlayer && board[2][2] == gameState.currentPlayer) ||
        (board[0][0] == gameState.currentPlayer && board[1][1] == gameState.currentPlayer && board[2][2] == gameState.currentPlayer) ||
        (board[0][2] == gameState.currentPlayer && board[1][1] == gameState.currentPlayer && board[2][0] == gameState.currentPlayer) 
    ){
        gameState.winner = gameState.currentPlayer
    } 
}

buildInitialState()
renderState()
$('#app').on('click', '.square', onSquareClick)