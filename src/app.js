const express = require("express");
const path = require("node:path");
const methodOverride = require("method-override");

const app = express();

app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "views")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (_req, res) => {
	res.send("<h1>Hello, World!</h1>");
});

module.exports = app;
