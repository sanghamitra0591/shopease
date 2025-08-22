import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMerchantProducts,
  clearProductError,
} from '../../redux/slices/productSlice';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import { Alert, Button } from '@mui/material';
import '../../styles/MerchantDashboard.css';

const MerchantDashboard = () => {
  const dispatch = useDispatch();
  const { merchantProducts, loading, error } = useSelector((state) => state.products);

  const [openForm, setOpenForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchMerchantProducts());
  }, [dispatch]);

  const handleAdd = () => {
    setEditProduct(null);
    setOpenForm(true);
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setOpenForm(true);
  };

  return (
    <div className="merchant-dashboard">
      <h2>Your Products</h2>

      {error && <Alert severity="error" onClose={() => dispatch(clearProductError())}>{error}</Alert>}

      <Button variant="contained" onClick={handleAdd} style={{ marginBottom: '1rem' }}>
        + Add New Product
      </Button>

      <ProductList products={merchantProducts} onEdit={handleEdit} loading={loading} />

      <ProductForm open={openForm} setOpen={setOpenForm} editProduct={editProduct} />
    </div>
  );
};

export default MerchantDashboard;
