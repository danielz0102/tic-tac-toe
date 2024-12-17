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

const DisplayController = (() => {
  const board = Gameboard.getBoard()
  const cells = document.querySelectorAll('.cell')
  
  const loadBoard = () => {
    values = board.flat()
    
    cells.forEach((cell, i) => {
      cell.textContent = values[i]
    })

    document.querySelector('.warning').textContent = ''
  }

  const displayNames = (player1, player2) => {
    const h2 = document.querySelector('#versus')
    h2.textContent = `${player1} vs ${player2}`
  }

  const updateTurn = (player, mark) => {
    const p = document.querySelector('#info')
    p.textContent = `${player}'s turn (${mark})`
  }

  const showResult = (win, player) => {
    const p = document.querySelector('#info')
    p.textContent = win ? `${player} wins` : "It's a tie"

    if (win) {
      p.classList.add('winner')
    }

    cells.forEach(cell => cell.disabled = true)
  }

  const showWarning = () => {
    const p = document.querySelector('.warning')
    p.textContent = 'Please select an empty cell'
  }

  return { 
    loadBoard,
    displayNames,
    updateTurn,
    showWarning,
    showResult 
  }
})()

function GameController(playerName1, playerName2) {
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
    const name = getActivePlayer().name

    console.log('----------------------------------------------')
    console.log(`${name}'s turn`)
    DisplayController.updateTurn(name, getActivePlayer().mark)

    Gameboard.printBoard()
    DisplayController.loadBoard()
  }

  const printResult = win => {
    console.log('----------------------------------------------')
    Gameboard.printBoard()
    console.log(win ? `${getActivePlayer().name} wins` : "It's a tie")
    DisplayController.loadBoard()
    DisplayController.showResult(win, getActivePlayer().name)
  }
  
  const resetGame = () => {
    Gameboard.initBoard()
    printRound()
  }
  
  const playRound = (row, col) => {
    const cellIsOccupied = !Gameboard.setBoard(getActivePlayer().mark, row, col)

    if (cellIsOccupied) {
      console.log('Please select an empty cell')
      DisplayController.showWarning()
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

    const winConditions = [
      board[row][0] === currentMark &&
      board[row][1] === currentMark &&
      board[row][2] === currentMark,

      board[0][col] === currentMark &&
      board[1][col] === currentMark &&
      board[2][col] === currentMark,
  
      //diagonals
      board[0][0] === currentMark &&
      board[1][1] === currentMark &&
      board[2][2] === currentMark,
  
      board[0][2] === currentMark &&
      board[1][1] === currentMark &&
      board[2][0] === currentMark
    ]

    return winConditions.some(c => c)
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

DisplayController.displayNames('Eve', 'Frank')
const game = GameController('Eve', 'Frank')
const cells = document.querySelectorAll('.cell')

cells.forEach(cell => cell.addEventListener('click', () => {
  game.playRound(cell.dataset.row, cell.dataset.col)
}))