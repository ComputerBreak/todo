const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 3030;

app.use(express.json())

const authRouter = require("./routes/router.js")
const loginRouter = require("./routes/login.js");
const tokenRouter = require("./routes/token");


app.use('/', authRouter);
app.use('/', loginRouter);
app.use('/', tokenRouter); 



app.listen(PORT, () => console.log("sever running on" + PORT));