import { useEffect, useState } from 'react'
import winCondition from '../data/winConditions.json'

function App() {
  const initalTurn = Math.floor(Math.random() * 2) === 0 ? true : false
  const position = ['', '', '', '', '', '', '', '', '']
  const [turn, setTurn] = useState(initalTurn)
  const [board, setBoard] = useState(position)
  const [xIndex, setXIndex] = useState([-1, -1, -1])
  const [oIndex, setOIndex] = useState([-1, -1, -1])
  const [win, setWin] = useState(false)
  const [winner, setWinner] = useState('')
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (win) {
      console.log(`${winner} wins!`)
    }
  }, [win, winner, board])

  function checkWin() {
    setWin(false)
    const positions = turn ? oIndex.toSorted() : xIndex.toSorted()
    const player = turn ? 'o' : 'x'
    for (let i = 0; i < winCondition.length; i++) {
      if (
        winCondition[i][0] === positions[0] &&
        winCondition[i][1] === positions[1] &&
        winCondition[i][2] === positions[2]
      ) {
        setWin(true)
        setWinner(player)
      }
    }
  }

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (board[Number(e.target.id)] === '') {
      const alter = turn ? [...oIndex] : [...xIndex]
      alter.pop()
      alter.unshift(e.target.id)
      turn ? setOIndex(alter) : setXIndex(alter)
      const newBoard = [...position]
      oIndex.map((add) => add !== -1 && newBoard.splice(add, 1, 'o'))
      xIndex.map((add) => add !== -1 && newBoard.splice(add, 1, 'x'))
      setBoard(newBoard)
      setTurn(!turn)
      setCount(1 + count)
      checkWin()
      console.log(board)
    }
  }

  return (
    <>
      <header>TOX</header>
      <div className="board">
        {board.map((spot, i) => (
          <button
            key={`pos ${i}`}
            id={String(i)}
            className="board-item"
            onClick={(e) => handleClick(e)}
          >
            {spot}
          </button>
        ))}
      </div>
      <footer>Turn: {count}</footer>
    </>
  )
}

export default App
