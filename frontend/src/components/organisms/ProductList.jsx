import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, CircularProgress } from '@mui/material';
import { FiEdit2 } from 'react-icons/fi';

const ProductList = ({ products, onEdit, loading }) => {
  if (loading) return <CircularProgress />;

  if (!products.length) return <p>No products found.</p>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Subcategory</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((prod) => (
            <TableRow key={prod._id}>
              <TableCell>{prod.name}</TableCell>
              <TableCell>{prod.category}</TableCell>
              <TableCell>{prod.subcategory}</TableCell>
              <TableCell>${prod.price}</TableCell>
              <TableCell>{prod.location}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(prod)}><FiEdit2 /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductList;
