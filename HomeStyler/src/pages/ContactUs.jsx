import React, { useState } from 'react';
import { db, addDoc, collection } from '../firebase.config'; // Ensure you import the methods correctly
import { toast } from 'react-toastify';
import "../styles/contactus.css"

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',    // Added phone number field
    message: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setError('All fields are required');
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Phone validation (simple regex for phone number)
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(formData.phone)) {
      setError('Please enter a valid phone number');
      return;
    }

    setError('');

    // Add form data to Firebase Firestore
    try {
      const docRef = await addDoc(collection(db, 'contactMessages'), formData);
      toast.success('Message submitted successfully!');
      console.log('Document written with ID: ', docRef.id);
      // Reset form fields
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (e) {
      toast.error('Error submitting message: ' + e.message);
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="contact-us-form">
      <h2>Contact Us</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>Phone Number:</label> {/* Added phone number field */}
          <input 
            type="text" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            required 
            maxLength="10"   // Assuming a 10-digit phone number
          />
        </div>
        <div>
          <label>Message:</label>
          <textarea 
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactUs;
