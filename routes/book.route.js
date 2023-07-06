const {Router} = require('express')

const bookRouter = Router()


const {addNewBook,getAllBooks,deleteBook,sortBookData,filterBookData} = require('../controller/book.controller')



bookRouter.post('/addbook', addNewBook)

bookRouter.get('/getbooks', getAllBooks)

bookRouter.delete('/deletebook/:bookid', deleteBook)

bookRouter.get('/sortbooks', sortBookData)

bookRouter.get('/filterbooks', filterBookData)




module.exports = {bookRouter}