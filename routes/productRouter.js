const productController = require('../controllers/productController')
const router = require('express').Router()
const jwtMiddleware = require('../middleware/jwt')

router.post('/', jwtMiddleware, productController.createProduct)
router.get('/', productController.getAllProducts)
router.get('/published', productController.getPublishedProduct)
router.get('/:id', productController.getProductsById)
router.put('/:id', jwtMiddleware, productController.updateProductById)
router.delete('/:id', jwtMiddleware, productController.deleteProduct)

module.exports = router
