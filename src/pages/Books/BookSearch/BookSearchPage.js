import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./BookSearchPage.css";
import { Pagination, Input } from "antd";
import Card from "../../../components/BookCards/BookCards";
import { headerStatus } from "../../../App";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme, useMediaQuery } from "@mui/material";

export default function Books() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Specify the number of items per page
  // eslint-disable-next-line
  const [data, setdata] = useState([]);
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const [searchQuery, setSearchQuery] = useState("");

  const [isCardsShowing, setIsCardsShowing] = useState(false);
  // eslint-disable-next-line
  const [Loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);
  const [donorInfo, setDonorInfo] = useState({}); // State to store donor information
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  // eslint-disable-next-line
  const [headerExpanded, setHeaderExpanded] = useContext(headerStatus);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const page = currentPage;
        const limit = itemsPerPage;

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/book`,
          {
            params: { page, limit, query: searchQuery },
          }
        );
        setData(response.data.items);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchData();
  }, [currentPage, itemsPerPage, searchQuery]);

  const handleCardsClick = () => {
    setIsCardsShowing(!isCardsShowing);
  };

  const fetchDonorInfo = async (donorId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user/donor/${donorId}`
      );
      // eslint-disable-next-line
      setDonorInfo(response.data);
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

  useEffect(() => {
    const fetchDonorInfoForData = async () => {
      const donorIds = data.map((item) => item.donor._id);
      const donorInfoList = await Promise.all(
        donorIds.map((donorId) => fetchDonorInfo(donorId))
      );
      const donorInfoMap = {};
      donorIds.forEach((donorId, index) => {
        donorInfoMap[donorId] = donorInfoList[index];
      });
      setDonorInfo(donorInfoMap);
    };

    fetchDonorInfoForData();
  }, [data]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  return (
    <div>
      <Input.Search
        placeholder="Search Books ..."
        enterButton="Search"
        size="large"
        loading={Loading}
        onSearch={handleSearch}
      />
      <div className={`cards${isCardsShowing ? " showing" : ""}`}>
        {Data &&
          Data.map((e) => {
            const { _id, title, course, author, description, image, donor } = e;
            const { fullName, email, phoneNumber, address } = donor;
            console.log(e, "e");

            return (
              <Card
                key={_id}
                id={_id}
                title={title}
                course={course}
                author={author}
                description={description}
                image={image}
                fullName={fullName}
                email={email}
                phoneNumber={phoneNumber}
                address={address}
                donorInfo={donorInfo}
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
      </div>
        <Pagination
          className="search-page-pagination"
          current={currentPage}
          total={totalPages * itemsPerPage}
          pageSize={itemsPerPage}
          onChange={handlePageChange}
        />
    </div>
  );
}
