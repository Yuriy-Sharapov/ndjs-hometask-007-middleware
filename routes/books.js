const express = require('express')

const router = express.Router()
module.exports = router

const stor = require('../storage/storage')
const cBook = require('../classes/cBook')

// 2. получить все книги
router.get('/books', (req, res) => {

    // получаем массив всех книг
    const {books} = stor
    //res.status(200)
    res.json(books)
})

// 3. получить книгу по ID
router.get('/books/:id', (req, res) => {

    // получаем объект книги, если запись не найдена, вернём Code: 404
    const {books} = stor
    const {id} = req.params
    const idx = books.findIndex( el => el.id === id)

    if (idx !== -1){
        //res.status(200)
        res.json(books[idx])
    }
    else{
        res.status(404)
        res.json("Книга не найдена")
    }
})

// 4. создать книгу
router.post('/books', (req, res) => {
    // создаём книгу и возвращаем её же вместе с присвоенным ID
    const {title, description, authors, favorite, fileCover, fileName} = req.body
    const newBook = new cBook(title, description, authors, favorite, fileCover, fileName)

    const {books} = stor
    books.push(newBook)
        
    res.status(201)
    res.json(newBook)
})

// 5. редактировать книгу по ID
router.put('/books/:id', (req, res) => {
    // редактируем объект книги, если запись не найдена, вернём Code: 404
    const {books} = stor
    const {id} = req.params
    const idx = books.findIndex( el => el.id === id)

    if (idx !== -1){

        const {title, description, authors, favorite, fileCover, fileName} = req.body
        books[idx].title       = title
        books[idx].description = description
        books[idx].authors     = authors
        books[idx].favorite    = favorite
        books[idx].fileCover   = fileCover
        books[idx].fileName    = fileName
 
        //res.status(200)
        res.json(books[idx])
    }
    else{
        res.status(404)
        res.json("Книга не найдена")
    }    
})

// 6. удалить книгу по ID
router.delete('/books/:id', (req, res) => {
    // удаляем книгу и возвращаем ответ: 'ok'
    const {books} = stor
    const {id} = req.params
    const idx = books.findIndex( el => el.id === id)

    if (idx !== -1){
        books.splice(idx, 1)
        //res.status(200)
        res.json("ok")
    }
    else{
        res.status(404)
        res.json("Книга не найдена") 
    }    
})   