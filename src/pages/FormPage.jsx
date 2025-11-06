import { useState } from 'react';
import ContactForm from '../components/ContactForm';
import Alert from '../components/Alert';
import './FormPage.css';

export default function FormPage({ theme, onThemeToggle }) {
  const [alertState, setAlertState] = useState({
    message: '',
    type: 'success',
  });

  const handleSubmitSuccess = (message, type) => {
    setAlertState({ message, type });
  };

  const closeAlert = () => {
    setAlertState({ message: '', type: 'success' });
  };

  return (
    <>
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <h1 className="app-title">Geopolymer Solutions</h1>
            <p className="app-subtitle">Convention Contact Form</p>
          </div>
          <button
            className="theme-toggle"
            onClick={onThemeToggle}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </header>

      <main className="app-main">
        <div className="form-container">
          <h2>Get in Touch</h2>
          <p className="form-description">
            We're excited to meet you at the convention! Please leave your contact information
            and we'll follow up with you soon.
          </p>
          <ContactForm onSubmitSuccess={handleSubmitSuccess} />
        </div>
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 Geopolymer Solutions. All rights reserved.</p>
      </footer>

      <Alert
        message={alertState.message}
        type={alertState.type}
        onClose={closeAlert}
        autoClose={5000}
      />
    </>
  );
}
