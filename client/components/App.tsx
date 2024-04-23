import { useEffect, useState } from 'react'
import winCondition from '../data/winConditions.json'

function App() {
  const initalTurn = Math.floor(Math.random() * 2) === 0 ? true : false
  const [turn, setTurn] = useState(initalTurn)
  const [board, setBoard] = useState(['', '', '', '', '', '', '', '', ''])
  const [xIndex, setXIndex] = useState([-1, -1, -1])
  const [oIndex, setOIndex] = useState([-1, -1, -1])
  const [count, setCount] = useState(0)
  const [spot, setSpot] = useState(-1)
  const [lock, setLock] = useState(true)
  const [winner, setWinner] = useState('')

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
        setLock(false)
        setWinner(player)
      }
    }
  }, [oIndex, xIndex, turn])

  function reset() {
    setSpot(-1)
    setOIndex([-1, -1, -1])
    setXIndex([-1, -1, -1])
    setWinner('')
    setLock(true)
    setBoard(['', '', '', '', '', '', '', '', ''])
  }

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (board[Number(e.target.id)] === '') {
      setSpot(Number(e.target.id))
      setTurn(!turn)
      setCount(1 + count)
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
            className={
              spot === 'x'
                ? i === xIndex[2]
                  ? 'board-item xPiece last'
                  : 'board-item xPiece'
                : spot === 'o'
                  ? i === oIndex[2]
                    ? 'board-item oPiece last'
                    : 'board-item oPiece'
                  : 'board-item'
            }
            onClick={(e) => lock && handleClick(e)}
          >
            {spot}
          </button>
        ))}
      </div>
      <footer>
        {winner !== '' ? 'Game Over' : turn ? 'Turn: X' : 'Turn: O'}
      </footer>
      {winner !== '' && (
        <>
          <p>{winner.toUpperCase()} Player Wins!</p>
          <button className="reset" onClick={reset}>
            <img className="reset" src="/reset.png" alt="reset button" />
          </button>
        </>
      )}
    </>
  )
}

export default App
