import React from 'react';
import Modal from 'react-modal';

const BookingConfirmation = ({ isOpen, onClose, roomName, price }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Booking Confirmation"
    >
      <h2>Booking Successful!</h2>
      <p>You have booked {roomName}.</p>
      <p>Price: ${price}</p>
      <button onClick={onClose}>Close</button>
    </Modal>
  );
};

export default BookingConfirmation;
