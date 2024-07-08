const cBook = require('../classes/cBook')

// Инициализация базы книг
const stor = {

    books: [
        new cBook(
            title       = "Война и мир", 
            description = "Интересная книга",
            authors     = "Лев Толстой",
            favorite    = true,
            fileCover   = "/home/library/war_and_peace.pdf",
            fileName    = "war_and_peace.pdf" ),
        new cBook(
            title       = "Трое в лодке, не считая собаку", 
            description = "Очень хорошая книга",
            authors     = "Джером К. Джером",
            favorite    = true,
            fileCover   = "/home/library/three_in_a_boat_not_counting_the_dog.pdf",
            fileName    = "three_in_a_boat_not_counting_the_dog.pdf" )
    ],
}

module.exports = stor

// {
//     "title": "Простоквашино",
//     "description": "Хорошая книга",
//     "authors": "Э. Успенский",
//     "favorite": true,
//     "fileCover": "/home/library/prostokvashino.pdf",
//     "fileName": "prostokvashino.pdf"
// }