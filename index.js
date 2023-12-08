const express = require("express")
const authRouter = require("./routes/auth")
const todoRouter = require("./routes/todo")
const app = express()

app.use(express.json())

app.use("/auth", authRouter)
app.use("/todo",todoRouter)

app.listen(5000, () => {
    console.log('listening....');
})