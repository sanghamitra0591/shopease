const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  try {
    const { name, category, subcategory, price, location } = req.body;

    if (!name || !category || !subcategory || price === undefined || !location) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (isNaN(Number(price))) {
      return res.status(400).json({ message: 'Price must be a number' });
    }

    const product = new Product({
      merchantId: req.user._id,
      name,
      category,
      subcategory,
      price: Number(price),
      location,
    });

    await product.save();

    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.merchantId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only edit your own products' });
    }

    const updateData = req.body;

    if (updateData.price !== undefined) {
      if (isNaN(Number(updateData.price))) {
        return res.status(400).json({ message: 'Price must be a number' });
      }
      updateData.price = Number(updateData.price);
    }

    Object.assign(product, updateData);

    await product.save();

    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.listProducts = async (req, res) => {
  try {
    const {
      category,
      subcategory,
      minPrice,
      maxPrice,
      location,
      page = 1,
      limit = 10,
    } = req.query;

    const filters = {};

    if (category) filters.category = category;
    if (subcategory) filters.subcategory = subcategory;
    if (location) filters.location = location;

    if (minPrice !== undefined || maxPrice !== undefined) {
      filters.price = {};
      if (minPrice !== undefined) {
        const minP = Number(minPrice);
        if (isNaN(minP)) return res.status(400).json({ message: 'minPrice must be a number' });
        filters.price.$gte = minP;
      }
      if (maxPrice !== undefined) {
        const maxP = Number(maxPrice);
        if (isNaN(maxP)) return res.status(400).json({ message: 'maxPrice must be a number' });
        filters.price.$lte = maxP;
      }
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    const total = await Product.countDocuments(filters);

    const products = await Product.find(filters)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .sort({ createdAt: -1 }); // optional: sort by newest

    res.json({
      products,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.merchantId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only delete your own products' });
    }

    await product.remove();

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
