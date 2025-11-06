import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import CommentModal from './CommentModal';
import './ContactsList.css';

export default function ContactsList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    fetchContacts();

    // Subscribe to real-time changes
    const subscription = supabase
      .channel('contacts_channel')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'contacts' }, (payload) => {
        setContacts((prev) => [payload.new, ...prev]);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContacts(data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching contacts:', err);
      setError('Failed to load contacts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  if (loading) {
    return (
      <div className="contacts-list">
        <div className="loading">Loading contacts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="contacts-list">
        <div className="error-message">{error}</div>
        <button onClick={fetchContacts} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="contacts-list">
      <div className="contacts-header">
        <h3>Contact Submissions ({contacts.length})</h3>
        <button onClick={fetchContacts} className="refresh-button">
          Refresh
        </button>
      </div>

      {contacts.length === 0 ? (
        <div className="no-contacts">
          <p>No contacts have been submitted yet.</p>
        </div>
      ) : (
        <div className="contacts-table-wrapper">
          <table className="contacts-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Comment</th>
                <th>Submitted</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.name}</td>
                  <td>{contact.company || '-'}</td>
                  <td>
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </td>
                  <td>
                    <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                  </td>
                  <td className="comment-cell">
                    {contact.comment ? (
                      <button
                        className="comment-button"
                        onClick={() => setSelectedContact(contact)}
                        title="Click to view full comment"
                      >
                        {contact.comment.substring(0, 50)}...
                      </button>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="date-cell">{formatDate(contact.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <CommentModal
        contact={selectedContact}
        onClose={() => setSelectedContact(null)}
      />
    </div>
  );
}
