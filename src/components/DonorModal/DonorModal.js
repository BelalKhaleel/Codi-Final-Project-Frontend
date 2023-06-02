import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../DonorModal/DonorModal.css";

const DonorInfoModal = ( donorId ) => {
const [userData, setUserData] = useState(donorId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(donorId);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (donorId) {
      fetchUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donorId]);

  const fetchUserData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/donor/${donorId}`)
      .then((response) => {
        console.log(response);
        console.log(userData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <button onClick={openModal}>Donor Info</button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Donor Information</h2>
            {userData ? (
              <>
                <span>Full Name: {userData.fullName}</span>
                <span>Email: {userData.email}</span>
                <span>Phone Number: {userData.phoneNumber}</span>
                <span>Address: {userData.address.governorate}, {userData.address.district}, {userData.address.city}</span>
              </>
            ) : (
              <span>Loading user data...</span>
            )}
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default DonorInfoModal;
