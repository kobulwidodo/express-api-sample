const apiResponse = require('../helpers/apiResponse')
const db = require('../models')

const Product = db.products

// Create Product
const createProduct = async (req, res) => {
  try {
    let body = {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      published: req.body.published ? req.body.published : false
    }

    const product = await Product.create(body)
    res.status(200).send(apiResponse('success', 200, 'Produk Berhasil dibuat', product))
  } catch (err) {
    res.status(422).send(apiResponse('error', 422, err.message))
  }
}

// Get All Products
const getAllProducts = async (req, res) => {
  try {
    let products = await Product.findAll({})
    res.status(200).send(apiResponse('success', 200, 'Produk berhasil didapatkan', products))
  } catch (err) {
    res.status(400).send(apiResponse('error', 400, err.message))
  }
}

// Get Product by ID
const getProductsById = async (req, res) => {
  try {
    let id = req.params.id
    let product = await Product.findOne({ where: {id: id} })
    res.status(200).send(apiResponse('success', 200, 'Berhasil medapatkan produk', product))
  } catch (err) {
    res.status(400).send(apiResponse('error', 400, err.message))
  }
}

// Get Published Product
const getPublishedProduct = async (req, res) => {
  try {
    let product = await Product.findAll({ where: { published: true }})
    res.status(200).send(apiResponse('success', 200, 'Berhasil mendapatkan produk', product))
  } catch (err) {
    res.status(400).send(apiResponse('error', 400, err.message))
  }
}

// Update Product
const updateProductById = async (req, res) => {
  try {
    let id = req.params.id
    let body = {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      published: req.body.published ? req.body.published : false
    }
    let product = await Product.update(body, { where: {id: id} })
    res.status(200).send(apiResponse('success', 200, 'Berhasil merubah produk', product))
  } catch (err) {
    res.status(433).send(apiResponse('error', 433, err.message))
  }
}

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    let id = req.params.id
    
    await Product.destroy({ where:{ id: id } })
    res.status(200).send(apiResponse('success', 200, 'Berhasil menghapus produk'))
  } catch (err) {
    res.status(433).send(apiResponse('error', 433, err.message))
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductsById,
  getPublishedProduct,
  updateProductById,
  deleteProduct
}
