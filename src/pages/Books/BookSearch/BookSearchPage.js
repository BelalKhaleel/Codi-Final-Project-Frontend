import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BookSearchPage.css";
import { Pagination } from "antd";
import Card from "../../../components/BookCards/BookCards";

export default function Books() {
  const [isCardsShowing, setIsCardsShowing] = useState(false);
  // eslint-disable-next-line
  const [Loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    document.title = "Books";
    getData();
  }, []);

  const handleCardsClick = () => {
    setIsCardsShowing(!isCardsShowing);
  };

  const getData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/book`)
      .then((response) => {
        // console.log(response);
        setData(response.data.items);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const fetchDonorInfo = async (donorId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/donor/${donorId}`);
      const donorInfo = response.data;
      console.log(response);
      // Process the donorInfo data
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Handle the 404 error
        console.log("Donor not found");
      } else {
        // Handle other errors
        console.log("An error occurred while fetching donor info", error);
      }
    }
  };

  return (
    <div className={`cards${isCardsShowing ? " showing" : ""}`}>
      {Data &&
        Data.map((e) => {
          const { _id, title, course, image, donor } = e;
          const { fullName, email, phoneNumber, address } = donor;
          console.log(e, "e");
          // Fetch the donor information
        fetchDonorInfo(donor._id)
          return (
            <Card
              key={_id}
              id={_id}
              title={title}
              course={course}
              image={image}
              fullName={fullName}
              email={email}
              phoneNumber={phoneNumber}
              address={address}
              handleCardsClick={handleCardsClick}
            />
          );
        })}
      <Pagination defaultCurrent={1} total={50} />
    </div>
  );
}
