const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 3030;

app.use(express.json())

const authRouter = require("./routes/router.js")

app.use('/api', authRouter);

app.listen(PORT, () => console.log("sever running on" + PORT));