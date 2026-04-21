import { useEffect, useState } from "react";
import axios from "axios";

function History() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/games")
      .then((res) => setData(res.data));
  }, []);
  return (
    <div>
      <h1>Game History</h1>
      {data.map((game, i) => (
        <div key={i}>
          <p>
            {game.player1} vs {game.player2}
          </p>
          <p>Winner: {game.finalWinner}</p>
        </div>
      ))}
    </div>
  );
}
