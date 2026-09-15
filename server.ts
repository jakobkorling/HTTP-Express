import express from "express";

const app = express();
app.use(express.json());
const PORT = 3000;
//WELCOME expected status code 200 OK
app.get("/", (req, res) => {
  res.send("Welcome to my photography website!");
});
//PORTFOLIO expected status code 200 OK
app.get("/portfolio", (req, res) => {
  const options = {
    About: "My photography journey",
    Categories: {
      Nature: ["Karlskrona", "Åre", "Göteborg"],
      Family: ["Karlsson", "Svensson", "Olsson"],
      Events: ["Concerts", "Market", "Sports events"],
      Weddings: ["Julia & Jonas", "Anders & Åsa", "Pelle & Lisa", "Olle & Felicia"],
    },
    lastUpdated: new Date().toISOString().split("T")[0],
  };
  res.json(options);
});
//ABOUT expected status code 200 OK
app.get("/about", (req, res) => {
  const about = {
      title: "About me",
      description: "My name is Jakob and I've been a photographer for 10 years!",
      passion: "I love to capture moments",
      contact: "Send an email to book a photoshoot.",
  };
  res.json(about);
});
//CONTACT expected status code 200 OK
// res.send because this route only sends a text message and does not need json
app.get("/contact", (req, res) => {
  res.send("Send an email to book a photoshoot!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

// A route that does not exist will get status code "404 Not found"