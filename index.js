// require("dotenv").config();

const server = require("./api/server.js")

const port = process.env.PORT || 9000;
server.listen(port, () => console.log(`\n** Running on port ${port} **--Server Running on http://localhost:9000 --**\n`));

 