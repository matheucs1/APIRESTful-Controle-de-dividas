const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(express.json());

app.use(cors());

const AuthRegisterUserRoutes = require("./routes/AuthRegisterUserRoutes");
const LoginRoutes = require("./routes/LoginRoutes");
const RevenuesRoutes = require("./routes/RevenuesRoutes");
const DebtsRoutes = require("./routes/DebtsRoutes");

app.use(AuthRegisterUserRoutes);
app.use(LoginRoutes);
app.use(RevenuesRoutes);
app.use(DebtsRoutes);

const port = process.env.PORT || 3000;

require("./database/connection");


app.listen(port, () => {
    console.log(`Servidor rodando em: http://localhost:${port}`)
});