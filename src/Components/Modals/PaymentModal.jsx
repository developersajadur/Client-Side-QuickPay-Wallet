// Modal.js
import { Button, Modal } from 'flowbite-react';
import React from 'react';

const PaymentModal = ({ show, onClose, title, children }) => {
  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">{children}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModal;
