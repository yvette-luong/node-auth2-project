const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
// const session = require("express-session");

// const KnexSessionStore = require("connect-session-knex")

const usersRouter = require("../users/users-router");
const protected = require("../auth/protected-mw.js");

const authRouter = require("../auth/auth-router.js");

const connection = require("../database/knexconnection")
const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
// server.use(session(sessionConfiguration));

server.use("/api/auth", authRouter);
server.use("/api/users", protected, usersRouter);

server.get("/", (req, res) => {
    res.json({ api: "Introduction to Authentication", session: req.session });
});
// "password": "$2a$06$e7xDTj2WF16AjiBGrxraWOKu/XKRllLmKh6f8QLBv5R3Jx2jTZu/e", -> jade
//  "data": {
//     "id": 2,
//     "username": "jane",
//     "password": "$2a$06$foS8zlAQl/4e7w5FX5nEteTpjth0V1aKFa174JDcou8rAqgNHpvkm",
//     "role": null
// } --> (the begin is the same) the library salting the password --> `salt`is an extra random string  to concatenate your password to make it more secure because even if u used the same password you still receive 2 diff hashes
module.exports = server;
