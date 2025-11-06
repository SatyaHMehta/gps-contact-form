import { useEffect } from 'react';
import './Alert.css';

export default function Alert({ message, type, onClose, autoClose = 5000 }) {
  useEffect(() => {
    if (!message || !autoClose) return;

    const timer = setTimeout(onClose, autoClose);
    return () => clearTimeout(timer);
  }, [message, autoClose, onClose]);

  if (!message) return null;

  return (
    <div className={`alert alert-${type}`}>
      <div className="alert-content">
        {type === 'success' && <span className="alert-icon">✓</span>}
        {type === 'error' && <span className="alert-icon">✕</span>}
        <span className="alert-text">{message}</span>
        <button
          className="alert-close"
          onClick={onClose}
          aria-label="Close alert"
        >
          ×
        </button>
      </div>
    </div>
  );
}
