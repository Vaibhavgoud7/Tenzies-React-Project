import { useState, useRef, useEffect } from "react";
import Dice from "./components/Dice";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(generateDice());
  const [time, setTime] = useState(0);
  const [rollCount, setRollCount] = useState(0);

  const buttonRef = useRef(null);

  const gameWon =
    dice.every((die) => die.value === dice[0].value) &&
    dice.every((die) => die.isHeld);

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();
    }
  }, [gameWon]);

  useEffect(() => {
    let timer;
    if (!gameWon) {
      timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameWon]);

  function generateDice() {
    const Dicearr = [];
    for (let i = 0; i < 10; i++) {
      const randnum = Math.floor(Math.random() * 6) + 1;
      Dicearr.push({ value: randnum, isHeld: false, id: nanoid() });
    }
    return Dicearr;
  }

  function hold(id) {
    setDice((prev) =>
      prev.map((each) =>
        each.id == id ? { ...each, isHeld: !each.isHeld } : each
      )
    );
  }

  const newDice = dice.map((item) => (
    <Dice
      key={item.id}
      num={item.value}
      isHeld={item.isHeld}
      hold={() => hold(item.id)}
    />
  ));

  function handleRoll() {
    if (gameWon) {
      setDice(generateDice());
      setTime(0);
      setRollCount(0);
    } else {
      setDice((prev) =>
        prev.map((obj) =>
          obj.isHeld
            ? obj
            : { ...obj, value: Math.floor(Math.random() * 6) + 1 }
        )
      );
      setRollCount((prev) => prev + 1);
    }
  }

  return (
    <main>
      {gameWon && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="stats">
        <p>⏱️ Time: {time}s</p>
        <p>🎲 Rolls: {rollCount}</p>
      </div>
      <div className="grid-container">{newDice}</div>
      <button ref={buttonRef} onClick={handleRoll} className="rollbtn">
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
