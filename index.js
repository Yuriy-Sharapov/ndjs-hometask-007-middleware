// подключаем Express
const express = require('express')

const userRouter = require('./routes/user')
const booksRouter = require('./routes/books')

const app = express()
app.use(express.json())   

app.use('/api', userRouter)
app.use('/api', booksRouter)

// Настраиваем порт, который будет прослушивать сервер
const PORT = process.env.PORT || 3000
app.listen(PORT)