const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://test:test123@cluster0.qerlehb.mongodb.net/mygame?retryWrites=true&w=majority",
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("ERROR:", err));

const GameSchema = new mongoose.Schema({
  player1: String,
  player2: String,
  rounds: Array,
  finalWinner: String,
});

const Game = mongoose.model("Game", GameSchema);

app.post("/api/game", async (req, res) => {
  const game = new Game(req.body);
  await game.save();
  res.send(game);
});

app.get("/api/games", async (req, res) => {
  const data = await Game.find();
  res.send(data);
});
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

app.listen(5000, () => console.log("Server running"));
