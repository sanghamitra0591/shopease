import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../redux/slices/productSlice';
import { Link } from 'react-router-dom';

function Home() {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (isLoading) return <p>Loading products...</p>;

  return (
    <div className="home">
      <h1>Products</h1>
      <div className="product-grid">
        {products.map((p) => (
          <div key={p._id} className="product-card">
            <h3>{p.name}</h3>
            <p>{p.price} USD</p>
            <Link to={`/products/${p._id}`}>View</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
