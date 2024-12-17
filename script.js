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
      return
    }

    if (checkWinner(row, col)) {
      printResult(true)
      return
    } else if (boardIsFull()) {
      printResult(false)
      return
    }

    switchTurn()
    printRound()
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
      && board[2][0] === currentMark
    ) {
      win = true
    }

    return win
  }

  const boardIsFull = () => {
    const board = Gameboard.getBoard()
    return !board.some(
      cell => cell[0] === null || cell[1] === null || cell[2] === null
    )
  }

  printRound()

  return { playRound, resetGame }
}