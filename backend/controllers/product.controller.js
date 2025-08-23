const Product = require('../models/product.model');
// const fs = require('fs');
// const path = require('path');
const cloudinary = require('../config/cloudinary'); 

exports.createProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
      image: req.file ? req.file.path || req.file.url : undefined, 
      imagePublicId: req.file ? req.file.filename : null
    };
    const newProduct = new Product(productData);
    await newProduct.save();
     const populatedProduct = await newProduct.populate("category", "name");
    res.status(201).json(populatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Create failed', error: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
    console.log("🔥 getAllProducts reached");
  try {
    const products = await Product.find().populate('category','name').sort({ createdAt: -1 }); 
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Getting products failed', error: error.message });
  }
};


exports.getProductById = async (req, res) => {
  try {
    const found = await Product.findById(req.params.id).populate("category");
    if (!found) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(found);
  } catch (error) {
    res.status(500).json({ message: 'Getting product failed', error: error.message });
  }
};


exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const updateData = { ...req.body };

   
    if (req.file) {
      // حذف الصورة القديمة من Cloudinary
      if (product.imagePublicId) {
        await cloudinary.uploader.destroy(product.imagePublicId);
      }

      // تحديث الصورة الجديدة بالـ URL الكامل
      updateData.image = req.file.path || req.file.url;
      updateData.imagePublicId = req.file.filename;
    }
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Updating product failed', error: error.message });
  }
};



exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });

    // if (deleted.image) {
    //   const imagePath = path.join(__dirname, '..', 'uploads', deleted.image);
    //   if (fs.existsSync(imagePath)) {
    //     fs.unlinkSync(imagePath);
    //     console.log('image deleted:', deleted.image);
    //   }
    // }
        if (deleted.imagePublicId) {
      await cloudinary.uploader.destroy(deleted.imagePublicId);
    }
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Deleting product failed', error: error.message });
  }
};



