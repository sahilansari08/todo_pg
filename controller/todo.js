const knexConfig = require("../knexfile")["development"];
const knex = require("knex")(knexConfig);

const listTodo = async (req,res) =>{
    const todo = await knex.select("*").from("todo");
  res.send({
    status: true,
    data: todo,
  });
}
const todo_Id = async (req,res) =>{
  const todo = await knex.select("*").from("todo").where("id", req.params.id);
  if (todo.length == 0)
    return res.send({
      status: false,
      messege: "Invalid id found",
    });
  res.send({
    status: true,
    data: todo,
  });
}
const post_route = async (req,res) =>{
  const todo = await knex("todo").insert(req.body).returning("*");
  res.send({
    status: true,
    data: todo,
  });
}
const delete_id = async (req,res)=>{
  const userId = req.params.id
  const deleteId = await knex("users").where({ id: userId }).del().returning("*");
  // console.log(deleteId, 'ddd...');
  if (deleteId.length == 0) return res.send({
    status: false,
    messege: "id not found"
  })
  return res.send({ status: true, data: deleteId })
}
const put_id = async (req,res)=>{
  const user = await knex("todo").update(req.body).where('id', req.params.id).returning("*")
  if (user.length == 0) return res.send({ status: false, message: "invalid id" })
  return res.send({ user })
}
module.exports = {listTodo,todo_Id,post_route,delete_id,put_id}