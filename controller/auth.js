const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const knexConfig = require("../knexfile")["development"];
const knex = require("knex")(knexConfig);


const login = async (req, res) => {
    const { email, password } = req.body
    const user = await knex('users').where({ email }).first()
    const passwordmatch = await bcrypt.compareSync(password, user.password)
    if (!passwordmatch) return res.send({
        status: false,
        messege: "Invalid email and password"
    })
    const token = jwt.sign(user, "12345678");
    res.cookie("token", token)
    return res.send({ status: true, data: { user: user, token } })
}

const signup = async (req,res) =>{
    const { name, email, password } = req.body
    try {
      const hashpassword = await bcrypt.hash(password, 4)
  
      const user = await knex("users").insert({ name, email, password: hashpassword }).returning("*");
      res.send({
        status: true,
        data: user,
      });
    } catch (error) {
      console.log(error);
      if (error.constraint == "users_email_unique") {
        res.send({
          status: false,
          messege: "email already taken",
        });
      }
    }
}
 
module.exports = { login,signup}