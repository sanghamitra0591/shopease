import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MerchantHome from './pages/MerchantHome';
import SnackbarAlert from './components/common/SnackbarAlert';
import UserHome from './pages/UserHome';
import ProtectedRoute from './components/common/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/common/NavBar';
import HomePage from './pages/HomePage';

function App() {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector(state => state.alert);

  const handleClose = () => {
    dispatch(hideAlert());
  };
  return (
    <>
      <NavBar />
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/merchant"
          element={
            <ProtectedRoute allowedRoles={['merchant']}>
              <MerchantHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserHome />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<LoginPage />} />
      </Routes>

      <SnackbarAlert
        open={open}
        message={message}
        severity={severity}
        onClose={handleClose}
      />
    </>
  );
}

export default App;
