import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    place: '',
    phoneNumber: '',
    photo: null,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('class', formData.class);
    formDataToSend.append('place', formData.place);
    formDataToSend.append('phoneNumber', formData.phoneNumber);
    formDataToSend.append('photo', formData.photo);

    try {
      await axios.post('http://localhost:2233/users', formDataToSend);
      alert('Form submitted successfully'); // Show alert message
      setFormData({  // Clear the form fields
        name: '',
        class: '',
        place: '',
        phoneNumber: '',
        photo: null,
      });
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />

      <label htmlFor="class">Class:</label>
      <input type="text" id="class" name="class" value={formData.class} onChange={handleInputChange} required />

      <label htmlFor="place">Place:</label>
      <input type="text" id="place" name="place" value={formData.place} onChange={handleInputChange} required />

      <label htmlFor="phoneNumber">Phone Number:</label>
      <input
        type="text"
        id="phoneNumber"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleInputChange}
        required
      />

      <label htmlFor="photo">Photo:</label>
      <input type="file" id="photo" name="photo" accept="image/*" onChange={handleFileChange} required />

      <button type="submit">Submit</button>
    </form>
  );
};

export default App;
