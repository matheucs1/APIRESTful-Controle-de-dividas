const mongoose = require("mongoose");

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const connect = () => {
    mongoose.connect(``);

    const connection = mongoose.connection;

    connection.on('error', () => {
        console.log("Erro ao conectar ao mongoDB");
    });

    connection.on("open", () => {
        console.log("Conectado ao mongoDB com sucesso!");
    });
};

connect();

module.exports = mongoose