const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const imageToBase64 = require("image-to-base64")

module.exports = class LoginController {
    static async login (req, res) {
        const  {email, password} = req.body;

        if (!email) {
            return res.status(422).json({ message: "O email é obrigatorio !"})
        }

        if (!password) {
            return res.status(422).json({ message: "A senha é obrigatoria !"})
        }

        let user = null;

        try {
            user = await User.findOne({email: email})
        } catch (error) {
            console.error(error)
            res.send("error", error)
        }

        if (!user) {
            res.status(444).json({ message: "Usuário não encontrado!"})
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            return res.status(422).json({ message: "Senha invalida"})
        }

        try {
            const secret = process.env.SECRET;
            const token = jwt.sign({ id: user._id}, secret)
            res.status(200).json({ message: "Autenticação realizada com sucesso!", token })
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Aconteceu um erro ao realizar a autenticação"})
        }
    }

    static async downloadImage(req, res) {
        const nameImage = req.headers["imgname"];
        imageToBase64(`./uploads/${nameImage}`)
          .then((response) => {
            res.send({ image: response });
          })
          .catch((error) => {
            console.error(error);
          });
      }

    static async getUserById (req, res) {
        const id = req.params.id;

        const user = await User.findById(id, '-password');

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado!"})
        }

        res.status(200).json({user})
    }
}