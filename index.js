const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("CaC Deploy!!!! Grupo 7 Node JS");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));