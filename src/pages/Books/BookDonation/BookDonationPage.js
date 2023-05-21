import React, { useState } from "react";
import axios from "axios";
import "./BookDonationPage.css";
// import image from "../../../assets/images/book_donations_2.jpg";

const BookDonationPage = () => {
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);
  // const [contactName, setContactName] = useState("");
  // const [email, setEmail] = useState("");

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
      formData.append("author", author);
      formData.append("description", description);
      formData.append("condition", condition);
      formData.append("status", status);
      formData.append("image", image);
      // formData.append("contactName", contactName);
      // formData.append("email", email);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/book`,
        {
          formData,
          headers: {
            "Content-Type": "multipart/form-data",
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

// const heroImage = "../../../assets/images/book_donations_2.jpg";

  return (
    <div>
      {/* <div className="donation-page-main-hero-section">
        <img src={hero-image} alt="book-donation"/>
      </div> */}
      {/* Step-by-step guide goes here */}
      <div className="donation-page-form-container">
        <form className="book-donation-page-form" onSubmit={handleSubmit}>
          <fieldset className="book-donation-page-fieldset">
            <legend className="book-donation-page-fieldset-legend">
              <h2>Donate a Book</h2>
            </legend>
            <label htmlFor="bookTitle">Book Title:</label>
            <input
              type="text"
              id="bookTitle"
              name="bookTitle"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              required
            />

            <label htmlFor="author">Author:</label>
            <input
              type="text"
              id="author"
              name="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />

            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>

            <label htmlFor="condition">Condition:</label>
            <select
              id="condition"
              name="condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              required
            >
              <option value="" disabled selected>
                Select the condition
              </option>
              <option value="Like New">Like New</option>
              <option value="Good">Good</option>
              <option value="Acceptable">Acceptable</option>
            </select>

            <label htmlFor="status">Status:</label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="" disabled selected>
                Select the status
              </option>
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>

            <label htmlFor="image">Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              required
            />

            {/* <label htmlFor="contactName">Your Name:</label>
        <input
          type="text"
          id="contactName"
          name="contactName"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
          required
        /> */}

            {/* <label htmlFor="email">Email Address:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /> */}

          </fieldset>
            <button type="submit">Donate</button>
        </form>
      </div>
    </div>
  );
};

export default BookDonationPage;
