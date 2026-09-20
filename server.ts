import express from "express";

const app = express();
app.use(express.json());

const PORT = 3000;

type Party = {
  id: number;
  name: string;
  leader: string;
  seats: number;
};

type PartyParams = {
  id: string;
};

let parties: Party[] = [
  { id: 1, name: "Socialdemokraterna", leader: "Magdalena Andersson", seats: 107},
  { id: 2, name: "Moderaterna", leader: "Ulf Kristersson", seats: 50},
]

app.get("/parties", (req, res) => {
  res.json(parties);
});

app.post("/parties", (req, res) => {
  const { name, leader, seats } = req.body;

  if (!name || !leader) {
    return res.status(400).json({
      message: "Name and leader are required",
    });
  }

  const newParty: Party = {
    id: parties.length + 1,
    name,
    leader,
    seats,
  };

  parties.push(newParty);

  res.json({
    message: "New party added",
    party: newParty,
  });
});

app.put("/parties/:id", (req, res) => {
  const id = Number(req.params.id);
  const party = parties.find((party) => party.id === id);

  if (!party) {
    return res.status(404).json({
      message: "Party not found!",
    });
  }

  const { name, leader, seats } = req.body;
  if (name !== undefined) party.name = name;
  if (leader !== undefined) party.leader = leader;
  if (seats !== undefined) party.seats = seats;

  res.json(party);
});

app.delete("/parties/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = parties.findIndex((party) => party.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Party not found!",
    });
  }

  parties.splice(index, 1);
  res.json({
    message: "Party deleted!",
  });
});



app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});