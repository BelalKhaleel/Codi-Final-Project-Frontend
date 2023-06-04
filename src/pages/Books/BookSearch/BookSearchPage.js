import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./BookSearchPage.css";
import { Pagination } from "antd";
import Card from "../../../components/BookCards/BookCards";
import { headerStatus } from "../../../App";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme, useMediaQuery } from "@mui/material";

export default function Books() {
  const [isCardsShowing, setIsCardsShowing] = useState(false);
  // eslint-disable-next-line
  const [Loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  // eslint-disable-next-line
  const [headerExpanded, setHeaderExpanded] = useContext(headerStatus);

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
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user/donor/${donorId}`
      );
      // eslint-disable-next-line
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
          fetchDonorInfo(donor._id);
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
      {isTablet && (
        <button
          onClick={() => {
            setHeaderExpanded((prev) => !prev);
          }}
          style={{
            display: isTablet ? "block" : "none",
          }}
        >
          <MenuIcon
            sx={{
              display: isTablet ? "block" : "none",
              position: "absolute",
              top: 0,
              right: 0,
              margin: "20px",
              color: "var(--color)",
              fontSize: "30px",
              cursor: "pointer",
            }}
          />
        </button>
      )}
      <Pagination defaultCurrent={1} total={50} />
    </div>
  );
}
