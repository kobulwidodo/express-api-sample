const db = require('../models')

const Product = db.products

// Create Product
const createProduct = async (req, res) => {
  let body = {
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  }

  const product = await Product.create(body)
  res.status(200).send(product)
}

// Get All Products
const getAllProducts = async (req, res) => {
  let products = await Product.findAll({
    attributes: [
      'title',
      'price'
    ]
  })
  res.status(200).send(products)
}

// Get Product by ID
const getProductsById = async (req, res) => {
  let id = req.params.id
  let product = await Product.findOne({ where: {id: id} })
  res.status(200).send(product)
}

// Get Published Product
const getPublishedProduct = async (req, res) => {
  let product = await Product.findAll({ where: { published: true } })
  res.status(200).send(product)
}

// Update Product
const updateProductById = async (req, res) => {
  let id = req.params.id
  let body = {
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  }
  let product = await Product.update(body, { where: {id: id} })
  res.status(200).send(product)
}

// Delete Product
const deleteProduct = async (req, res) => {
  let id = req.params.id
  
  await Product.destroy({ where:{ id: id } })
  res.status(200).send({'msg': 'Product was deleted'})
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductsById,
  getPublishedProduct,
  updateProductById,
  deleteProduct
}
