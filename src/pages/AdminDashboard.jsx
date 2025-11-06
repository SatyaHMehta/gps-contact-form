import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContactsList from '../components/ContactsList';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = sessionStorage.getItem('admin-authenticated');
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('admin-authenticated');
    navigate('/admin');
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="admin-dashboard-container">
      <header className="admin-header">
        <div className="admin-header-content">
          <div className="admin-title-section">
            <h1>Admin Dashboard</h1>
            <p>View and manage contact submissions</p>
          </div>
          <div className="admin-buttons">
            <button className="home-button" onClick={handleHome} title="Go to homepage">
              🏠 Home
            </button>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="admin-main">
        <ContactsList />
      </main>
    </div>
  );
}
