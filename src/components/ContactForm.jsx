import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import './ContactForm.css';

export default function ContactForm({ onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    comment: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from('contacts').insert([
        {
          name: formData.name.trim(),
          company: formData.company.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          comment: formData.comment.trim(),
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      // Reset form
      setFormData({
        name: '',
        company: '',
        phone: '',
        email: '',
        comment: '',
      });

      onSubmitSuccess('Your contact information has been submitted successfully!', 'success');
    } catch (error) {
      console.error('Error submitting form:', error);
      onSubmitSuccess(
        error.message || 'An error occurred while submitting the form. Please try again.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">
          Full Name <span className="required">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          disabled={loading}
          className={errors.name ? 'input-error' : ''}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Acme Corp"
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">
          Email Address <span className="required">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          disabled={loading}
          className={errors.email ? 'input-error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">
          Phone Number <span className="required">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+1 (555) 123-4567"
          disabled={loading}
          className={errors.phone ? 'input-error' : ''}
        />
        {errors.phone && <span className="error-message">{errors.phone}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="comment">Comments / Notes</label>
        <textarea
          id="comment"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          placeholder="Tell us more about your interest in our services..."
          rows="5"
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        className="submit-button"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
