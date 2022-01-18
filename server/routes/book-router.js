const express = require('express');
const BookCtrl = require('../controllers/book-ctrl');
const router = express.Router();

router.post('/book', BookCtrl.createBook);
router.put('/book/:id', BookCtrl.updateBook);
router.delete('/book/:id', BookCtrl.deleteBook);
router.get('/book/:id', BookCtrl.getBookById);
router.get('/book', BookCtrl.getBooks);

module.exports = router;