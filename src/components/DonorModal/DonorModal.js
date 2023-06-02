import React, { useState } from "react";
import "../DonorModal/DonorModal.css";

const DonorInfoModal = ({ fullName, email, phoneNumber, address }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={openModal}>Donor Info</button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Donor Information</h2>
            <span>Full Name: {fullName}</span>
            <span>Email: {email}</span>
            <span>Phone Number: {phoneNumber}</span>
            <span>Address: {address}</span>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default DonorInfoModal;
