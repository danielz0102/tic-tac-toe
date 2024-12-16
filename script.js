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
    }
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
    players[0].turn ^= true
    players[1].turn ^= true
  }

  const playRound = () => {
    const activePlayer = getActivePlayer()
    console.log(`${activePlayer.name}'s turn`)
    Gameboard.printBoard()
  }

  playRound()

  return { playRound }
}

const game = gameController('daniel', 'sara')