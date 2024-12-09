import {useState} from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import {WINNING_COMBINATIONS} from "./winning-combinations.js";

const INITIAL_GAME_BOARD = Array(10).fill(Array(10).fill(null));

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
}

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function deriveWinner(gameBoard, players) {
  let winner = null;

  // for every move, perform a check to see if there is a winner
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
    const fourthSquareSymbol = gameBoard[combination[3].row][combination[3].column];
    const fifthSquareSymbol = gameBoard[combination[4].row][combination[4].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol && firstSquareSymbol === fourthSquareSymbol && firstSquareSymbol === fifthSquareSymbol) {
      winner = players[firstSquareSymbol];
      break; // stop checking if there is a winner
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns) {
  // we have to make a deep copy of INITIAL_GAME_BOARD to avoid mutating it. Otherwise, game restart will not work properly
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for (const turn of gameTurns) {
    const {square, player} = turn;
    const {row, col} = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  // only base on state gameTurns, we derive current active player, no need to store it in state
  const activePlayer = deriveActivePlayer(gameTurns);

  // only base on state gameTurns, we derive current state of game board, no need to store it in state
  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 100 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns);

      const newTurn = {square: {row: rowIndex, col: colIndex}, player: currentPlayer};
      return [newTurn, ...prevTurns];
    })
  }

  function handleRematch() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {...prevPlayers, [symbol]: newName};
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'}
                  onChangeName={handlePlayerNameChange}/>
          <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'}
                  onChangeName={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRematch}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
