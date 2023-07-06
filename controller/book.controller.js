
const { BookModel } = require('../model/book.model')




const addNewBook = async (req, res) => {


    const { Title, Author, Genere, Description, Price } = req.body;

    try {

        const newbook = new BookModel({ Title, Author, Genere, Description, Price })

        await newbook.save()

        return res.status(200).send({
            "ok": true,
            "Book": newbook,
            "msg": "New Book has been added Successfully !"
        })


    }
    catch (error) {

        return res.status(400).send({
            "ok": false,
            "msg": error.message
        })

    }

}


const getAllBooks = async (req, res) => {

    try {

        const books = await BookModel.find({})

        return res.status(200).send({
            "ok": true,
            "Book": books,
            "msg": "Book has been fetched Successfully !"
        })

    }
    catch (error) {
        return res.status(400).send({
            "ok": false,
            "msg": error.message
        })
    }


}


const deleteBook = async (req, res) => {

    const { bookid } = req.params;

    try {

        const ispresent = await BookModel.findById({ _id: bookid })

        if (!ispresent) {
            return res.status(400).send({
                "ok": false,
                "msg": "Book is not found in DB"
            })
        }

        else {

            const deletedbook = await BookModel.findByIdAndDelete({ _id: bookid })

            return res.status(200).send({
                "ok": true,
                "Book": deletedbook,
                "msg": "Book has been deleted Successfully !"
            })

        }

    }
    catch (error) {
        return res.status(400).send({
            "ok": false,
            "msg": error.message
        })
    }


}


const sortBookData = async (req, res) => {

    const { sort } = req.query;

    console.log("-->", sort)

    let sortorder = 0;


    if (sort === 'asc') {
        sortorder = 1
    }
    else if (sort === 'desc') {
        sortorder = -1
    }

    console.log(sortorder)

    try {

        let booksdata;

        if (sortorder) {

            booksdata = await BookModel.aggregate([{ $sort: { Price: sortorder } }])

            return res.status(200).send({
                "ok": true,
                "Book": booksdata,
                "msg": "New Book has been added Successfully !"
            })
        }

        else {

            booksdata = await BookModel.find({})

            return res.status(200).send({
                "ok": true,
                "Book": booksdata,
                "msg": "New Book has been added Successfully !"
            })

        }




    } catch (error) {
        return res.status(400).send({
            "ok": false,
            "msg": error.message
        })
    }

}


const filterBookData = async (req, res) => {

    const { genere, sort } = req.query;

    let sortorder = 0;

    if (sort === 'asc') {
        sortorder = 1
    }
    else if (sort === 'desc') {
        sortorder = -1
    }

    try {

        let bookdata;

        if (sortorder) {

            bookdata = await BookModel.aggregate([{ $match: { Genere: genere } }, { $sort: { Price: sortorder } }])

            return res.status(200).send({
                "ok": true,
                "Book": bookdata
            })

        }

        else {

            bookdata = await BookModel.aggregate([{ $match: { Genere: genere } }])

            return res.status(200).send({
                "ok": true,
                "Book": bookdata
            })

        }




    } catch (error) {
        return res.status(400).send({
            "ok": false,
            "msg": error.message
        })
    }

}



module.exports = { addNewBook, getAllBooks, deleteBook, sortBookData, filterBookData }