import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct } from '../../redux/slices/productSlice';

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  if (isLoading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="product-details">
      <h1>{product.name}</h1>
      <p>Category: {product.category?.name}</p>
      <p>Price: {product.price} USD</p>
      <p>{product.description}</p>
    </div>
  );
}

export default ProductDetails;
