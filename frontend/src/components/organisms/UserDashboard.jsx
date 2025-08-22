import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../../redux/slices/productSlice';
import ProductGrid from './ProductGrid';
import FilterPanel from './FilterPanel';
import { Pagination, Box } from '@mui/material';
import '../../styles/UserDashboard.css';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { allProducts, loading } = useSelector((state) => state.products);

  const [filters, setFilters] = useState({
    category: '',
    subcategory: '',
    location: '',
    priceMin: '',
    priceMax: '',
    search: '',
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch products from backend on page/filter change
  useEffect(() => {
    const query = {
      page,
      limit: 10,
      ...filters,
    };

    // Clean up empty values
    Object.keys(query).forEach((key) => {
      if (query[key] === '') delete query[key];
    });

    dispatch(fetchAllProducts(query)).then((res) => {
      if (res.payload?.pages) {
        setTotalPages(res.payload.pages);
      }
    });
  }, [dispatch, page, filters]);

  const handlePageChange = (_, value) => {
    setPage(value);
    window.scrollTo(0, 0); // scroll up when changing page
  };

  return (
    <div className="user-dashboard">
      <FilterPanel filters={filters} setFilters={setFilters} />
      <ProductGrid products={allProducts.products || []} loading={loading} />
      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </div>
  );
};

export default UserDashboard;
