const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

app.use("/api", require("./api"));

app.use(express.static(path.join(__dirname, "views")));
app.use(
  "/n320nodejs",
  function (req, res, next) {
    if (req.url.endsWith(".html")) {
      const safeHost = req.headers.host.includes("http")
        ? req.header.host
        : "http://" + req.headers.host;
      res.redirect(safeHost + req.url);
      //   next();
    } else {
      next();
    }
  },
  express.static(path.join(__dirname, "views"))
);

app.listen(5445);

console.log("Running: http://localhost:5445");
