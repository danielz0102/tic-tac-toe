const Gameboard = (() => {
  const board = []

  for (let i = 0; i < 3; i++) {
    board[i] = []
    for (let j = 0; j < 3; j++) {
      board[i].push(' ')
    }
  }

  const getBoard = () => board

  const printBoard = () => {
    for (let i = 0; i < 3; i++) {
      console.log(board[i])
    }
  }

  return { getBoard, printBoard }
})()

const board = Gameboard.getBoard()
Gameboard.printBoard()