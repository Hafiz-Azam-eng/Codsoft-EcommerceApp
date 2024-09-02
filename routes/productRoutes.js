const express = require('express');
const multer = require('multer');
const router = express.Router();
const {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductMiddleware
} = require('../controllers/productController');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Routes
router.get('/', getAllProducts);
router.post('/', upload.single('image'), createProduct);
router.get('/:id', getProductMiddleware, getProductById);
router.put('/:id', upload.single('image'), getProductMiddleware, updateProduct);
router.delete('/:id', getProductMiddleware, deleteProduct);

module.exports = router;
