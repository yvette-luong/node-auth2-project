const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
// const session = require("express-session");

// const KnexSessionStore = require("connect-session-knex")

const usersRouter = require("../users/users-router");
// const connection = require("../database/knexconnection")
const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
// server.use(session(sessionConfiguration));
server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
    res.json({ api: "Introduction to Authentication", session: req.session });
});

module.exports = server;
