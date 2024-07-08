// подключаем Express
const express = require('express')
// подключаем генератор гуидов UUID
const { v4: uuid } = require('uuid')

class cBook{

    constructor(title = "", description = "", authors = "", favorite = "", fileCover = "", fileName = "", id = uuid()){
        
        this.title       = title
        this.description = description
        this.authors     = authors
        this.favorite    = favorite
        this.fileCover   = fileCover
        this.fileName    = fileName
        this.id          = id

    }
}   

// Инициализация базы книг
const stor = {

    books: [
        new cBook(
            title       = "Война и мир", 
            description = "Интересная книга",
            authors     = "Лев Толстой",
            favorite    = "+2",
            fileCover   = "/home/library/war_and_peace.pdf",
            fileName    = "war_and_peace.pdf" ),
        new cBook(
            title       = "Трое в лодке, не считая собаку", 
            description = "Очень хорошая книга",
            authors     = "Джером К. Джером",
            favorite    = "+1",
            fileCover   = "/home/library/three_in_a_boat_not_counting_the_dog.pdf",
            fileName    = "three_in_a_boat_not_counting_the_dog.pdf" )
    ],
};
   
const app = express()
app.use(express.json())   

// 1. авторизация пользователя
app.post('/api/user/login', (req, res) => {
    // метод всегда возвращает Code: 201 и статичный объект: { id: 1, mail: "test@mail.ru" }

    res.status(201)
    const user = { id: 1, mail: "test@mail.ru" }
    res.json(user)
})

// 2. получить все книги
app.get('/api/books', (req, res) => {
    // получаем массив всех книг

    const {books} = stor
    //res.status(200)
    res.json(books)

})

// 3. получить книгу по ID
app.get('/api/books/:id', (req, res) => {
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
app.post('/api/books', (req, res) => {
    // создаём книгу и возвращаем её же вместе с присвоенным ID
    const {title, description, authors, favorite, fileCover, fileName} = req.body
    const newBook = new cBook(title, description, authors, favorite, fileCover, fileName)

    const {books} = stor
    books.push(newBook)
        
    res.status(201)
    res.json(newBook)
})

// 5. редактировать книгу по ID
app.put('/api/books/:id', (req, res) => {
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
app.delete('/api/books/:id', (req, res) => {
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

// Настраиваем порт, который будет прослушивать сервер
const PORT = process.env.PORT || 3000
app.listen(PORT)