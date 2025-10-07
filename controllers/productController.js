const { v4: uuidv4 } = require('uuid');
const { NotFoundError, ValidationError } = require('../utils/errors');

let products = [
  { id: uuidv4(), name: 'Laptop', description: 'Dell XPS 13', price: 1200, category: 'Electronics', inStock: true },
  { id: uuidv4(), name: 'Phone', description: 'iPhone 14', price: 999, category: 'Electronics', inStock: false },
];

// GET /api/products?category=Electronics&page=1&limit=2
exports.getProducts = (req, res, next) => {
  try {
    let result = [...products];

    // Filtering
    if (req.query.category) {
      result = result.filter(p => p.category.toLowerCase() === req.query.category.toLowerCase());
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || result.length;
    const start = (page - 1) * limit;
    const paginated = result.slice(start, start + limit);

    res.json({ total: result.length, page, limit, data: paginated });
  } catch (err) {
    next(err);
  }
};

// GET /api/products/:id
exports.getProductById = (req, res, next) => {
  try {
    const product = products.find(p => p.id === req.params.id);
    if (!product) throw new NotFoundError('Product not found');
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// POST /api/products
exports.createProduct = (req, res, next) => {
  try {
    const newProduct = { id: uuidv4(), ...req.body };
    products.push(newProduct);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
};

// PUT /api/products/:id
exports.updateProduct = (req, res, next) => {
  try {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) throw new NotFoundError('Product not found');
    products[index] = { ...products[index], ...req.body };
    res.json(products[index]);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/products/:id
exports.deleteProduct = (req, res, next) => {
  try {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) throw new NotFoundError('Product not found');
    products.splice(index, 1);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

// GET /api/products/search?name=laptop
exports.searchProducts = (req, res, next) => {
  try {
    const name = req.query.name?.toLowerCase() || '';
    const result = products.filter(p => p.name.toLowerCase().includes(name));
    res.json(result);
  } catch (err) {
    next(err);
  }
};

// GET /api/products/stats
exports.getProductStats = (req, res, next) => {
  try {
    const stats = {};
    products.forEach(p => {
      stats[p.category] = (stats[p.category] || 0) + 1;
    });
    res.json(stats);
  } catch (err) {
    next(err);
  }
};
