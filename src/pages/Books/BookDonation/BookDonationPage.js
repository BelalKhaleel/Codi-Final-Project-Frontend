import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./BookDonationPage.css";
import { Collapse } from "antd";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import { headerStatus } from "../../../App";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme, useMediaQuery } from "@mui/material";

const { Panel } = Collapse;

const text1 =
  "Make sure to create an account and ensure that you are logged in so that you can donate a book.";

const text2 =
  "After logging in, go to the donate page and fill up the form to donate a book. Provide all the necessary information such as the book title, author, condition, and any other details required.";

const text3 =
  "If someone is interested in your donated book, they will contact you using the information you provided in the donation form. You can then communicate with them to agree on the details of the delivery process, such as the meeting location or shipping arrangements.";

const text4 =
  "Once the donation process has been successfully completed, go to your profile page and mark the donated book as no longer available. This will inform other users that the book has been donated and is no longer up for donation.";

const BookDonationPage = () => {
  const [bookTitle, setBookTitle] = useState("");
  const [course, setCourse] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [university, setUniversity] = useState("");
  const [universityList, setUniversityList] = useState([]);
  const [condition, setCondition] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);
  const [cookies] = useCookies();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  // eslint-disable-next-line
  const [headerExpanded, setHeaderExpanded] = useContext(headerStatus);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/university`
        );
        const universities = response.data;
        setUniversityList(universities);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUniversities();
  }, []);

  const onChange = (key) => {
    console.log(key);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Update the button text to "Donating..."
    const donateButton = e.target.querySelector("button[type='submit']");
    donateButton.disabled = true; // Disable the button to prevent multiple clicks
    donateButton.innerText = "Donating...";

    try {
      const formData = new FormData();
      formData.append("title", bookTitle);
      formData.append("course", course);
      formData.append("author", author);
      formData.append("description", description);
      formData.append("university", university);
      formData.append("condition", condition);
      formData.append("status", status);
      formData.append("image", image);

      const token = cookies["user-token"];
      const secretKey = process.env.REACT_APP_JWT_SECRET;
      const decodedToken = jwt_decode(token, secretKey);
      const donorId = decodedToken.id;

      formData.append("donor", donorId);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/book`,
        formData,
        {
          headers: {
            "user-token": token,
          },
        }
      );
      // Handle success
      console.log(response.data);
    } catch (error) {
      // Handle error
      console.error(error);
    } finally {
      // Reset the button text to "Donate" after the request is sent
      donateButton.disabled = false;
      donateButton.innerText = "Donate";
    }
  };

  return (
    <div>
      <div className="donation-page-title">
        <h1>Books for a Brighter Future: Donate Today!</h1>
      </div>
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
              color: "var(--color)",
              margin: "20px",
              fontSize: "30px",
              cursor: "pointer",
            }}
          />
        </button>
      )}
      <div className="donation-page-container">
        <div className="donation-page-form-container">
          <form className="book-donation-page-form" onSubmit={handleSubmit}>
            <fieldset className="book-donation-page-fieldset">
              <legend className="book-donation-page-fieldset-legend">
                <h2>Donate a Book</h2>
              </legend>
              <label className="book-donation-page-label" htmlFor="bookTitle">
                Book Title:
              </label>
              <input
                type="text"
                id="bookTitle"
                name="bookTitle"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                required
              />

              <label className="book-donation-page-label" htmlFor="course">
                Course:
              </label>
              <input
                type="text"
                id="course"
                name="course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              />

              <label className="book-donation-page-label" htmlFor="author">
                Author:
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />

              <label className="book-donation-page-label" htmlFor="description">
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>

              <label className="book-donation-page-label" htmlFor="university">
                University:
              </label>
              <select
                id="university"
                name="university"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                required
              >
                <option value="" valuedisabled="true">
                  Select the university
                </option>

                {universityList.map((university) => (
                  <option key={university._id} value={university._id}>
                    {university.name}
                  </option>
                ))}
              </select>

              <label className="book-donation-page-label" htmlFor="condition">
                Condition:
              </label>
              <select
                id="condition"
                name="condition"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                required
              >
                <option value="" valuedisabled="true">
                  Select the condition
                </option>
                <option value="Like New">Like New</option>
                <option value="Good">Good</option>
                <option value="Acceptable">Acceptable</option>
              </select>

              <label className="book-donation-page-label" htmlFor="status">
                Status:
              </label>
              <select
                id="status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="" valuedisabled="true">
                  Select the status
                </option>
                <option value="Available">Available</option>
                <option value="Not Available">Not Available</option>
              </select>

              <label className="book-donation-page-label" htmlFor="image">
                Image:
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                required
              />
            </fieldset>
            <button className="book-donation-page-form-btn" type="submit">
              Donate
            </button>
          </form>
        </div>
        <div className="book-donation-page-guidelines">
          <span>
            Before donating, please check out the following guidelines:
          </span>
          <div className="book-donation-page-accordian">
            <Collapse defaultActiveKey={["1"]} onChange={onChange}>
              <Panel header="Step 1: Make sure you're logged in" key="1">
                <p>{text1}</p>
              </Panel>
              <Panel header="Step 2: Fill out the Donation Form" key="2">
                <p>{text2}</p>
              </Panel>
              <Panel
                header="Step 3: Arrange Delivery with Interested Parties"
                key="3"
              >
                <p>{text3}</p>
              </Panel>
              <Panel header="Step 4: Mark the Book as Donated" key="4">
                <p>{text4}</p>
              </Panel>
            </Collapse>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDonationPage;
