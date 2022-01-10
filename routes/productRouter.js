const productController = require('../controllers/productController')
const router = require('express').Router()

router.post('/', productController.createProduct)
router.get('/', productController.getAllProducts)
router.get('/published', productController.getPublishedProduct)
router.get('/:id', productController.getProductsById)
router.put('/:id', productController.updateProductById)
router.delete('/:id', productController.deleteProduct)

module.exports = router
