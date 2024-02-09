// src/components/FormComponent.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import ImageUploader from 'react-image-upload';
import axios from 'axios';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    place: '',
    phoneNumber: '',
    photo: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = (image) => {
    setFormData((prevData) => ({ ...prevData, photo: image }));
  };

  


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2233/users', formData);
  
      if (response.status === 201) {
        console.log('Form data submitted successfully');
        // Optionally, reset the form after submission
        setFormData({
          name: '',
          class: '',
          place: '',
          phoneNumber: '',
          photo: null,
        });
  
        // Redirect or update UI after successful submission
        // Example: Redirect to a success page or fetch updated data
        // history.push('/success'); // Assuming you are using React Router
      } else {
        console.error('Error submitting form data');
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };
  
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="formClass">
        <Form.Label>Class</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your class"
          name="class"
          value={formData.class}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="formPlace">
        <Form.Label>Place</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your place"
          name="place"
          value={formData.place}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="formPhoneNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="tel"
          placeholder="Enter your phone number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="formPhoto">
        <Form.Label>Photo</Form.Label>
        <ImageUploader
          withIcon={true}
          buttonText="Choose photo"
          onChange={handleImageUpload}
          imgExtension={['.jpg', '.gif', '.png', '.jpeg']}
          maxFileSize={5242880}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default App;
