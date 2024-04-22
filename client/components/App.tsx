import { useEffect, useState } from 'react'
import winCondition from '../data/winConditions.json'

function App() {
  const initalTurn = Math.floor(Math.random() * 2) === 0 ? true : false
  const position = ['', '', '', '', '', '', '', '', '']
  const [turn, setTurn] = useState(initalTurn)
  const [board, setBoard] = useState(position)
  const [xIndex, setXIndex] = useState([-1, -1, -1])
  const [oIndex, setOIndex] = useState([-1, -1, -1])
  const [count, setCount] = useState(0)
  const [spot, setSpot] = useState(-1)

  useEffect(() => {
    const newBoard = ['', '', '', '', '', '', '', '', '']
    oIndex.map((add) => add !== -1 && newBoard.splice(add, 1, 'o'))
    xIndex.map((add) => add !== -1 && newBoard.splice(add, 1, 'x'))
    setBoard(newBoard)
  }, [oIndex, xIndex])

  useEffect(() => {
    if (board[spot] === '') {
      const alter = turn ? [...oIndex] : [...xIndex]
      alter.pop()
      alter.unshift(spot)
      turn ? setOIndex(alter) : setXIndex(alter)
    }
  }, [spot, turn, board])

  useEffect(() => {
    const positions = turn ? oIndex.toSorted() : xIndex.toSorted()
    const player = turn ? 'o' : 'x'
    for (let i = 0; i < winCondition.length; i++) {
      if (
        winCondition[i][0] == positions[0] &&
        winCondition[i][1] == positions[1] &&
        winCondition[i][2] == positions[2]
      ) {
        alert(`${player} wins!`)
      }
    }
  }, [oIndex, xIndex, turn])

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setSpot(Number(e.target.id))
    setTurn(!turn)
    setCount(1 + count)
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
            onClick={handleClick}
          >
            {spot}
          </button>
        ))}
      </div>
      <footer>Turn: {turn ? 'x' : 'o'}</footer>
    </>
  )
}

export default App
