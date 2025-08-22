import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../redux/slices/productSlice';
import CircularProgress from '@mui/material/CircularProgress';


const ProductGrid = ({ products, loading, isMerchant }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  if (loading) return <CircularProgress />;
  if (!products.length) return <p>No products found.</p>;

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{product.name}</Typography>
              {/* product details */}
            </CardContent>
            {isMerchant && (
              <IconButton
                aria-label="delete"
                color="error"
                onClick={() => handleDelete(product._id)}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;
