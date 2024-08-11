import React from 'react';
import { Modal, Button } from 'flowbite-react';
import '../../index.css'; // Ensure you import your custom styles

const PaymentModal = ({ show, onClose, title, children }) => {
  if (!show) return null;

  return (
    <Modal show={show} onClose={onClose} size="md" id='modal-bg'>
      <Modal.Header>
        {title}
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  );
};

export default PaymentModal;
