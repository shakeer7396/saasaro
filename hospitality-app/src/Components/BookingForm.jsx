import React, { useState, useRef } from 'react';
import axios from 'axios';

function BookingForm() {
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [error, setError] = useState('');
  const emailRef = useRef();
  const nameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const bookingData = {
      email: emailRef.current.ref,
      name: nameRef.current.value,
      phone: phoneRef.current.value,
      address: addressRef.current.value,
    };

    try {
      await axios.post('https://victorious-tan-bikini.cyclic.app', bookingData);
      setBookingSuccess(true);
    } catch (error) {
      setError('An error occurred while submitting the form.');
    }
  };

  if (bookingSuccess) {
    return <div>Thank you for your booking!</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div>{error}</div>}
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" ref={emailRef} required />
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" ref={nameRef} required />
      <label htmlFor="phone">Phone:</label>
      <input type="tel" id="phone" ref={phoneRef} required />
      <label htmlFor="address">Address:</label>
      <input type="text" id="address" ref={addressRef} required />
      <button type="submit">Book Now</button>
    </form>
  );
}

export default BookingForm;

