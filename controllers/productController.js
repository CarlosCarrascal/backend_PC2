const Product = require('../models/Product');

// Obtener todos los productos
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// Obtener un producto por ID
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// Crear nuevo producto con imagen automática
const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, stock } = req.body;
    
    // Construir URL de imagen usando Lorem Picsum
    const image_url = `https://picsum.photos/seed/${encodeURIComponent(name)}/400/300`;
    
    // Crear producto con todos los campos incluyendo image_url
    const product = await Product.create({
      name,
      description,
      price,
      stock,
      image_url
    });
    
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// Actualizar producto existente
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    await product.update(req.body);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// Eliminar producto
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    await product.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
