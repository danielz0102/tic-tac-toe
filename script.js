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

  const getBoard = () => board

  initBoard()

  return { printBoard, initBoard, setBoard, getBoard }
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
    console.log('----------------------------------------------')
    console.log(`${getActivePlayer().name}'s turn`)
    Gameboard.printBoard()
  }

  const printResult = win => {
    console.log('----------------------------------------------')
    Gameboard.printBoard()
    console.log(win ? `${getActivePlayer().name} wins` : "It's a tie")
  }
  
  const resetGame = () => {
    Gameboard.initBoard()
    printRound()
  }
  
  const playRound = (row, col) => {
    const cellIsOccupied = !Gameboard.setBoard(getActivePlayer().mark, row, col)

    if (cellIsOccupied) {
      console.log('Please select an empty cell')
    } else if (checkWinner(row, col)) {
      printResult(true)
    } else if (checkTie(row, col)) {
      printResult(false)
    } else {
      switchTurn()
      printRound()
    }
  }

  const checkWinner = (row, col) => {
    const board = Gameboard.getBoard()
    const currentMark = getActivePlayer().mark
    let win = false

    if (board[row][0] === currentMark
      && board[row][1] === currentMark
      && board[row][2] === currentMark
    ) {
      win = true
    }

    if (board[0][col] === currentMark
      && board[1][col] === currentMark
      && board[2][col] === currentMark
    ) {
      win = true
    }

    //checking diagonals
    if (board[0][0] === currentMark
      && board[1][1] === currentMark
      && board[2][2] === currentMark
    ) {
      win = true
    }

    if (board[0][2] === currentMark
      && board[1][1] === currentMark
      && board[2][0]
    ) {
      win = true
    }

    return win
  }

  const checkTie = (row, col) => {
    const board = Gameboard.getBoard()
    const boardIsFull = !board.some(
      cell => cell[0] === null || cell[1] === null || cell[2] === null
    )

    return boardIsFull && !checkWinner(row, col)
  }

  printRound()

  return { playRound, resetGame }
}

const game5 = gameController('Ivy', 'Jack');
game5.playRound(0, 0); // Ivy
game5.playRound(0, 1); // Jack
game5.playRound(0, 2); // Ivy
game5.playRound(1, 1); // Jack
game5.playRound(1, 0); // Ivy
game5.playRound(2, 0); // Jack
game5.playRound(1, 2); // Ivy
game5.playRound(2, 2); // Jack
game5.playRound(2, 1); // Ivy

