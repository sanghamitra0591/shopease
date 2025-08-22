import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addProduct, updateProduct } from '../../redux/slices/productSlice';

const ProductForm = ({ open, setOpen, editProduct }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subcategory: '',
    price: '',
    location: '',
  });

  useEffect(() => {
    if (editProduct) {
      setFormData({
        name: editProduct.name || '',
        category: editProduct.category || '',
        subcategory: editProduct.subcategory || '',
        price: editProduct.price || '',
        location: editProduct.location || '',
      });
    } else {
      setFormData({
        name: '',
        category: '',
        subcategory: '',
        price: '',
        location: '',
      });
    }
  }, [editProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || '' : value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.category || !formData.price) {
      alert('Please fill all required fields.');
      return;
    }

    if (editProduct) {
      dispatch(updateProduct({ id: editProduct._id, data: formData }));
    } else {
      dispatch(addProduct(formData));
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle>{editProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
      <DialogContent dividers>
        <TextField
          margin="dense"
          name="name"
          label="Product Name"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          margin="dense"
          name="category"
          label="Category"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <TextField
          margin="dense"
          name="subcategory"
          label="Subcategory"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.subcategory}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="price"
          label="Price"
          type="number"
          fullWidth
          variant="outlined"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <TextField
          margin="dense"
          name="location"
          label="Location"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.location}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {editProduct ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductForm;
