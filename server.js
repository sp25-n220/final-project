const express = require("express");
const path = require("path");

const app = express();

app.use(
  express.json()
);

app.use(
  "/api",
  require("./api")
);

app.use(
  express.static(
      path.join(__dirname, "views")
  )
);

app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

app.use((req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  }
});

app.listen(5445);

console.log("Running: http://localhost:5445");
