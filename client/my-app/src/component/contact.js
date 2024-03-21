import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import './contact.css';
import { useDispatch } from 'react-redux';
import { createUser } from '../redux/action';

const Contact = () => {
    const [show, setShow] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobilenumber: '',
        message: ''
    });
    const dispatch = useDispatch();
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const setFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0]; 
            setSelectedImage(selectedFile); 
            
            setFormData({ ...formData, image: selectedFile }); 
        }
    };
    

    const sendEmail = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('image', selectedImage);
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('mobilenumber', formData.mobilenumber);
        formDataToSend.append('message', formData.message);

        dispatch(createUser(formDataToSend));

        setFormData({
            name: '',
            email: '',
            mobilenumber: '',
            message: ''
        });

        setSelectedImage(null);
        setShow(true);
    }

    return (
        <div className='container'>
            {show && 
                <Alert variant="primary" onClose={() => setShow(false)} dismissible>
                    Your Email Successfully Sent
                </Alert>
            }
            <h2>Contact Me!</h2>
            <div className="image-wrapper">
                <Form.Group className="mb-3" >
                    <Form.Control type="file" name="image" onChange={setFile} />
                </Form.Group>
            </div>
            <form id="contactForm">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        autoComplete="name" 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        autoComplete="email" 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="number">Mobile Number:</label>
                    <input 
                        type="number" 
                        id="mobilenumber" 
                        name="mobilenumber" 
                        value={formData.mobilenumber} 
                        onChange={handleChange} 
                        autoComplete="mobilenumber" 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message:</label>
                    <textarea 
                        id="message" 
                        name="message" 
                        cols="15" 
                        rows="3" 
                        value={formData.message} 
                        onChange={handleChange} 
                        autoComplete="message" 
                        required
                    ></textarea>
                </div>
                <Button variant="primary" type="submit" onClick={sendEmail}>
                    Send
                </Button>
            </form>
        </div>
    );
};

export default Contact;
