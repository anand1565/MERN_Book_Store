import express from "express";
import { Book } from '../modals/bookModal.js'

const router = express.Router()

// Route for save a new Book

router.post('/', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: "Send all the required fields: title, author, publishYear"
            })
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };

        const book = await Book.create(newBook);

        return res.status(201).send(book)

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

// Route to get one book by id from database

router.get('/singlebook/:id', async (req, res) => {
    try {
        const books = await Book.findById(req.params.id)
        if (!books) {
            return res.status(404).send("Book not found")
        }

        return res.status(200).json({
            data: books
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

// Route to get all book from database

router.get('/all', async (req, res) => {
    try {
        const allbooks = await Book.find()
        res.status(200).send({ count: allbooks.length, data: allbooks })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})
// Route to update a book by id
router.put('/update/:id', async (req, res) => {
    // const { id } = req.params
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: "Send all the required fields: title, author, publishYear"
            })
        }
        const { id } = req.params;
        // const updatedbook = await Book.findOneAndUpdate({ author: req.params.author }, req.body, { new: true }) // by author
        const updatedbook = await Book.findByIdAndUpdate(id, req.body, { new: true }) // by id
        if (!updatedbook) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).send({ message: 'Book updated successfully', updatedBook: updatedbook })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

// Route to delete a book by id

router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedbook = await Book.findByIdAndDelete(req.params.id, req.body, { new: true });
        if (!deletedbook) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).send({ message: "Book deleted", Deletedbook: deletedbook })

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

export default router;