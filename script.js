let game

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

  const setBoard = (mark, row, col) => {
    if (!board[row][col]) {
      board[row][col] = mark
      return true
    }

    return false
  }

  const getBoard = () => board

  initBoard()

  return { initBoard, setBoard, getBoard }
})()

const DOMController = (() => {
  const gameHTML = document.querySelector('#game')
  const formHTML = document.querySelector('aside')
  let cells

  const initForm = () => {
    gameHTML.hidden = true
    formHTML.hidden = false
    document.querySelector('form').addEventListener('submit', validateForm)
  }

  const initGame = () => {
    const form = document.querySelector('form')
    const player1 = form.querySelector('#player1').value
    const player2 = form.querySelector('#player2').value

    formHTML.hidden = true
    gameHTML.hidden = false
    showNames(player1, player2)
    
    cells = document.querySelectorAll('.cell')
    game = GameController(player1, player2)

    cells.forEach(cell => 
      cell.addEventListener('click', 
        () => game.playRound(cell.dataset.row, cell.dataset.col)
      )
    )
  }

  const validateForm = e => {
    e.preventDefault()
    
    if (document.querySelector('form').checkValidity()) initGame()
  }

  const resetUI = () => {
    const p = document.querySelector('#info')
    p.classList.remove('winner')
    cells.forEach(cell => cell.disabled = false)
    document.querySelector('.warning').textContent = ''
  }

  const loadBoard = () => {
    resetUI()

    values = Gameboard.getBoard().flat()
    cells.forEach((cell, i) => {
      cell.textContent = values[i]
    })
  }

  const showNames = (player1, player2) => {
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
    showNames,
    updateTurn,
    showWarning,
    showResult,
    initGame,
    initForm
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

    DOMController.updateTurn(name, getActivePlayer().mark)
    DOMController.loadBoard()
  }

  const printResult = win => {
    DOMController.loadBoard()
    DOMController.showResult(win, getActivePlayer().name)
  }
  
  const resetGame = () => {
    Gameboard.initBoard()
    printRound()
  }
  
  const playRound = (row, col) => {
    const cellIsOccupied = !Gameboard.setBoard(getActivePlayer().mark, row, col)

    if (cellIsOccupied) {
      DOMController.showWarning()
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

  document.querySelector('#restartBtn').addEventListener('click', resetGame)

  return { playRound, resetGame }
}

DOMController.initForm()