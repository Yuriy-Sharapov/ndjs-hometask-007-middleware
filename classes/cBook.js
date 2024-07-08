// подключаем генератор гуидов UUID
const { v4: uuid } = require('uuid')

class cBook{

    constructor(title = "", description = "", authors = "", favorite = false, fileCover = "", fileName = "", id = uuid()){
        
        this.title       = title
        this.description = description
        this.authors     = authors
        this.favorite    = favorite
        this.fileCover   = fileCover
        this.fileName    = fileName
        this.id          = id

    }
}

module.exports = cBook