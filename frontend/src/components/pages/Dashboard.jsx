import { useSelector } from 'react-redux';

function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.name}</h1>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
    </div>
  );
}

export default Dashboard;
