require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const index = express();
require("./db/conn");
const cors = require("cors");
const router = require("./routes/router");
const PORT = process.env.PORT || 3000;

// Use bodyParser middleware for parsing JSON bodies
index.use(bodyParser.json());

// Use cors middleware for handling cross-origin requests
index.use(cors());

// Use the router for routing requests
index.use(router);

// Server start
index.listen(PORT, () => {
    console.log(`Server started at Port Number ${PORT}`);
});
