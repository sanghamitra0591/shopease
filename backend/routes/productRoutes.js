const express = require('express');
const router = express.Router();
const { protect, merchantOnly } = require('../middleware/auth');
const Product = require('../models/Product');

// @desc    Get merchant's products
// @route   GET /api/products/merchant/my-products
// @access  Private/Merchant
router.get('/merchant/my-products', protect, merchantOnly, async (req, res) => {
  try {
    const products = await Product.find({ merchant: req.user._id })
      .populate('category', 'name slug')
      .populate('subcategory', 'name slug')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Get all products with filters and search
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      search,
      category,
      subcategory,
      minPrice,
      maxPrice,
      location,
      sortBy,
      page = 1,
      limit = 12
    } = req.query;

    let query = { isActive: true };

    if (search) {
      query.$text = { $search: search };
    }

    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (location) {
      query['location.city'] = { $regex: location, $options: 'i' };
    }

    let sortOptions = {};
    switch (sortBy) {
      case 'price_low': sortOptions.price = 1; break;
      case 'price_high': sortOptions.price = -1; break;
      case 'newest': sortOptions.createdAt = -1; break;
      case 'rating': sortOptions['rating.average'] = -1; break;
      case 'popular': sortOptions.views = -1; break;
      default: sortOptions.createdAt = -1;
    }

    const products = await Product.find(query)
      .populate('category', 'name slug')
      .populate('subcategory', 'name slug')
      .populate('merchant', 'name email')
      .sort(sortOptions)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name slug')
      .populate('subcategory', 'name slug')
      .populate('merchant', 'name email phone')
      .populate('reviews.user', 'name');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    product.views += 1;
    await product.save();

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Create product
// @route   POST /api/products
// @access  Private/Merchant
router.post('/', protect, merchantOnly, async (req, res) => {
  try {
    const {
      name,
      description,
      shortDescription,
      price,
      originalPrice,
      category,
      subcategory,
      images,
      stock,
      brand,
      tags,
      specifications,
      location
    } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, description, price, and category'
      });
    }

    const product = await Product.create({
      name,
      description,
      shortDescription,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      category,
      subcategory,
      merchant: req.user._id,
      images: images || [],
      stock: Number(stock) || 0,
      brand,
      tags: tags || [],
      specifications: specifications || [],
      location
    });

    await product.populate('category', 'name slug');
    await product.populate('subcategory', 'name slug');
    await product.populate('merchant', 'name email');

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Merchant
router.put('/:id', protect, merchantOnly, async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (product.merchant.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this product'
      });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
      .populate('category', 'name slug')
      .populate('subcategory', 'name slug')
      .populate('merchant', 'name email');

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Merchant
router.delete('/:id', protect, merchantOnly, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (product.merchant.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this product'
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;
