import { useEffect } from 'react';
import './CommentModal.css';

export default function CommentModal({ contact, onClose }) {
  useEffect(() => {
    // Close modal on Escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!contact) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Contact Details</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-section">
            <h3>Name</h3>
            <p className="modal-value">{contact.name}</p>
          </div>

          <div className="modal-section">
            <h3>Company</h3>
            <p className="modal-value">{contact.company || '—'}</p>
          </div>

          <div className="modal-section">
            <h3>Email</h3>
            <p className="modal-value">
              <a href={`mailto:${contact.email}`} className="modal-link">
                {contact.email}
              </a>
            </p>
          </div>

          <div className="modal-section">
            <h3>Phone</h3>
            <p className="modal-value">
              <a href={`tel:${contact.phone}`} className="modal-link">
                {contact.phone}
              </a>
            </p>
          </div>

          <div className="modal-section">
            <h3>Submitted</h3>
            <p className="modal-value">{new Date(contact.created_at).toLocaleString()}</p>
          </div>

          {contact.comment && (
            <div className="modal-section modal-comment-section">
              <h3>Comments</h3>
              <div className="modal-comment-box">
                <p className="modal-comment">{contact.comment}</p>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="modal-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
