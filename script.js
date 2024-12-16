const Gameboard = (() => {
  const board = []

  const initBoard = () => {
    for (let i = 0; i < 3; i++) {
      board[i] = []
      for (let j = 0; j < 3; j++) {
        board[i].push(null)
      }
    }
  }

  const printBoard = () => {
    for (let i = 0; i < 3; i++) {
      console.log(board[i])
    }
  }

  const setBoard = (mark, row, col) => {
    if (!board[row][col]) {
      board[row][col] = mark
      return true
    }

    return false
  }

  initBoard()

  return { printBoard, initBoard, setBoard }
})()

function gameController(playerName1, playerName2) {
  const players = [
    {
      name: playerName1,
      mark: 'x',
      turn: true
    },
    {
      name: playerName2,
      mark: 'o',
      turn: false
    }
  ]
  
  const getActivePlayer = () => players.find(player => player.turn === true)
  
  const switchTurn = () => {
    players[0].turn = !players[0].turn
    players[1].turn = !players[1].turn
  }
  
  const printRound = () => {
    const activePlayer = getActivePlayer()
    console.log(`${activePlayer.name}'s turn`)
    Gameboard.printBoard()
  }
  
  const playRound = (row, col) => {
    const activePlayer = getActivePlayer()
    const cellIsOccupied = !Gameboard.setBoard(activePlayer.mark, row, col)

    cellIsOccupied ? console.log('Please select an empty cell') : switchTurn()

    printRound()
  }

  printRound()

  return { playRound }
}

const game = gameController('daniel', 'sara')
game.playRound(0, 0)