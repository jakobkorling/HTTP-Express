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

//Task 1 - List alla parties
let parties: Party[] = [
  { id: 1, name: "Socialdemokraterna", leader: "Magdalena Andersson", seats: 107},
  { id: 2, name: "Moderaterna", leader: "Ulf Kristersson", seats: 74},
  { id: 3, name: "Sverigedemokraterna", leader: "Jimmie Åkesson", seats: 67},
  { id: 4, name: "Centerpartiet", leader: "Elisabeth Thand Ringqvist", seats: 35},
  { id: 5, name: "Liberalerna", leader: "Simona Mohamsson", seats: 21},
  { id: 6, name: "Vänsterpartiet", leader: "Nooshi Dadgostar", seats: 17},

]


//Tasl 2 - Add a new party
//Task 6 - Handle bad input
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

//Task 4 - Update a party
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


//Task 5 - Remove a party
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