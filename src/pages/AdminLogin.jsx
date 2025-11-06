import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const ADMIN_PASSWORD = 'GPS2025';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate a small delay for security perception
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (password === ADMIN_PASSWORD) {
      // Store auth status in sessionStorage (only for this browser session)
      sessionStorage.setItem('admin-authenticated', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }

    setLoading(false);
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <div className="admin-login-header">
          <h1>Admin Access</h1>
          <p>Enter password to view contact submissions</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Enter admin password"
              disabled={loading}
              autoFocus
            />
            {error && <span className="error-message">{error}</span>}
          </div>

          <button type="submit" disabled={loading} className="submit-button">
            {loading ? 'Verifying...' : 'Access Dashboard'}
          </button>
        </form>

        <div className="admin-login-footer">
          <p>🔒 This area is password protected.</p>
        </div>
      </div>
    </div>
  );
}
