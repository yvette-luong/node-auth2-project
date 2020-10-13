const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session)

const usersRouter = require("../users/users-router");
const authRouter = require("../auth/auth-router.js");
const protected = require("../auth/protected-mw.js");
const connection = require("../database/knexconnection")


const server = express();

const sessionConfiguration = {
    name: "ramen", // defaults to sid for the cookie name
    secret: process.env.SESSION_SECRET || "make a yummy ramen and dont share!",
    cookie: {
        httpOnly: true, // true means JS can't access the cookie
        maxAge: 1000 * 60 * 10, // expires after 10 mins
        secure: process.env.SECURE_COOKIES || false, // true means send cookies over https only
    },
    resave: false, // re save the session information even if there are no changes
    saveUninitialized: true, // read about GDPR compliance
    store: new KnexSessionStore({
        knex: connection, // connection to the database
        tablename: "sessions",
        sidfieldname: "sid", // name of session id column
        createtable: true, // if the table doesn't exist, create it
        clearInterval: 1000 * 60 * 60, // remove expired sessions from the database every hour
    }),
};


server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfiguration));

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
