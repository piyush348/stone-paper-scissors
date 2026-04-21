import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const saveGame = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/game", {
        player1: p1Name,
        player2: p2Name,
        rounds: [],
        finalWinner:
          score.p1 > score.p2 ? p1Name : score.p2 > score.p1 ? p2Name : "Tie",
      });

      console.log("Game saved:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [round, setRound] = useState(1);
  const [p1Choice, setP1Choice] = useState("");
  const [p2Choice, setP2Choice] = useState("");
  const [result, setResult] = useState("");
  const [score, setScore] = useState({ p1: 0, p2: 0 });
  const [p1Name, setP1Name] = useState("");
  const [p2Name, setP2Name] = useState("");

  const getWinner = () => {
    if (p1Choice === p2Choice) return "Tie";

    if (
      (p1Choice === "stone" && p2Choice === "scissors") ||
      (p1Choice === "scissors" && p2Choice === "paper") ||
      (p1Choice === "paper" && p2Choice === "stone")
    ) {
      return "Player 1";
    }

    return "Player 2";
  };

  const playRound = () => {
    const winner = getWinner();
    setResult(winner);

    if (winner === "Player 1") {
      setScore({ ...score, p1: score.p1 + 1 });
    } else if (winner === "Player 2") {
      setScore({ ...score, p2: score.p2 + 1 });
    }

    setRound(round + 1);
  };
  useEffect(() => {
    if (round > 6) {
      saveGame();
    }
  }, [round]);
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Stone Paper Scissors</h1>
      <input
        placeholder="Player 1 Name"
        onChange={(e) => setP1Name(e.target.value)}
      />
      <br />
      <br />
      <input
        placeholder="Player 2 Name"
        onChange={(e) => setP2Name(e.target.value)}
      />

      <br />
      <br />

      <h2>Round: {round}</h2>

      <select onChange={(e) => setP1Choice(e.target.value)}>
        <option>Select Player 1</option>
        <option value="stone">Stone</option>
        <option value="paper">Paper</option>
        <option value="scissors">Scissors</option>
      </select>

      <select onChange={(e) => setP2Choice(e.target.value)}>
        <option>Select Player 2</option>
        <option value="stone">Stone</option>
        <option value="paper">Paper</option>
        <option value="scissors">Scissors</option>
      </select>

      <br />
      <br />

      <button onClick={playRound} disabled={round > 6}>
        Play
      </button>

      <h3>Result: {result}</h3>

      <h3>Score</h3>
      <p>Player 1: {score.p1}</p>
      <p>Player 2: {score.p2}</p>
      {round > 6 && (
        <h2>
          Final Winner:{" "}
          {score.p1 > score.p2
            ? "Player 1"
            : score.p2 > score.p1
              ? "Player 2"
              : "Tie"}
        </h2>
      )}
    </div>
  );
}

export default App;
