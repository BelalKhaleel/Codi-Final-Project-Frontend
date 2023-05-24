import React, { useState } from "react";
import axios from "axios";
import "./BookDonationPage.css";
import { Collapse } from "antd";
// import image from "../../../assets/images/book_donations_2.jpg";

const { Panel } = Collapse;

const text1 =
  "After logging in, go to the donate page and fill up the form to donate a book. Provide all the necessary information such as the book title, author, condition, and any other details required.";

const text2 =
  "If someone is interested in your donated book, they will contact you using the information you provided in the donation form. You can then communicate with them to agree on the details of the delivery process, such as the meeting location or shipping arrangements.";

const text3 =
  "Once the donation process has been successfully completed, go to your profile page and mark the donated book as no longer available. This will inform other users that the book has been donated and is no longer up for donation.";

const BookDonationPage = () => {
  // const [contactName, setContactName] = useState("");
  // const [email, setEmail] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [course, setCourse] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [university, setUniversity] = useState("");
  const [condition, setCondition] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);

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
      // formData.append("contactName", contactName);
      // formData.append("email", email);
      formData.append("title", bookTitle);
      formData.append("course", course);
      formData.append("author", author);
      formData.append("description", description);
      formData.append("university", university);
      formData.append("condition", condition);
      formData.append("status", status);
      formData.append("image", image);

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
                required
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
                <option value="" disabled selected>
                  Select the university
                </option>
                <option value="Lebanese University (LU)">
                  Lebanese University (LU)
                </option>
                <option value="American University of Beirut (AUB)">
                  American University of Beirut (AUB)
                </option>
                <option value="Saint Joseph University (USJ)">
                  Saint Joseph University (USJ)
                </option>
                <option value="Beirut Arab University (BAU)">
                  Beirut Arab University (BAU)
                </option>
                <option value="University Saint Esprit - Kaslik (USEK)">
                  University Saint Esprit - Kaslik (USEK)
                </option>
                <option value="Lebanese American University (LAU)">
                  Lebanese American University (LAU)
                </option>
                <option value="Haigazian University (Haigazian)">
                  Haigazian University (Haigazian)
                </option>
                <option value="University of Balamand (UOB)">
                  University of Balamand (UOB)
                </option>
                <option value="Académie Libanaise des Beaux Arts (ALBA)">
                  Académie Libanaise des Beaux Arts (ALBA)
                </option>
                <option value="La Sagesse University (ULS)">
                  La Sagesse University (ULS)
                </option>
                <option value="Middle East University (MEU)">
                  Middle East University (MEU)
                </option>
                <option value="Notre Dame University (NDU)">
                  Notre Dame University (NDU)
                </option>
                <option value="Al Makassed University of Beirut (MUB)">
                  Al Makassed University of Beirut (MUB)
                </option>
                <option value="Lebanese International University (LIU)">
                  Lebanese International University (LIU)
                </option>
                <option value="Arab Open University (AOU)">
                  Arab Open University (AOU)
                </option>
                <option value="Global University (GU)">
                  Global University (GU)
                </option>
                <option value="Islamic University of Lebanon (IUL)">
                  Islamic University of Lebanon (IUL)
                </option>
                <option value="Antonine University (UA)">
                  Antonine University (UA)
                </option>
                <option value="Al Jinan University (JU)">
                  Al Jinan University (JU)
                </option>
                <option value="City University (CityU)">
                  City University (CityU)
                </option>
                <option value="Rafic Hariri University (RHU)">
                  Rafic Hariri University (RHU)
                </option>
                <option value="American University of Technology (AUT)">
                  American University of Technology (AUT)
                </option>
                <option value="American University of Science & Technology (AUST)">
                  American University of Science & Technology (AUST)
                </option>
                <option value="Modern University for Business & Sciences (MUBS)">
                  Modern University for Business & Sciences (MUBS)
                </option>
                <option value="Al-Kafaat University (AKU)">
                  Al-Kafaat University (AKU)
                </option>
                <option value="University of Tripoli (UT)">
                  University of Tripoli (UT)
                </option>
                <option value="Lebanese Canadian University (LCU)">
                  Lebanese Canadian University (LCU)
                </option>
                <option value="Arts, Sciences & Technology University in Lebanon (AUL)">
                  Arts, Sciences & Technology University in Lebanon (AUL)
                </option>
                <option value="American University of Culture and Education (AUCE)">
                  American University of Culture and Education (AUCE)
                </option>
                <option value="Lebanese German University (LGU)">
                  Lebanese German University (LGU)
                </option>
                <option value="Université Libano-Française de Technologie et des Sciences Appliqués (ULF)">
                  Université Libano-Française de Technologie et des Sciences
                  Appliqués (ULF)
                </option>
                <option value="Holy Family University - Université Sainte Famille (USF)">
                  Holy Family University - Université Sainte Famille (USF)
                </option>
                <option value="University of Sciences &Arts in Lebanon (USAL)">
                  University of Sciences &Arts in Lebanon (USAL)
                </option>
                <option value="Phoenicia University (PU)">
                  Phoenicia University (PU)
                </option>
                <option value="Maaref University (MU)">
                  Maaref University (MU)
                </option>
                <option value="Azm University (Azm)">
                  Azm University (Azm)
                </option>
                <option value="International University of Beirut (BIU)">
                  International University of Beirut (BIU)
                </option>
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
                <option value="" disabled selected>
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
                <option value="" disabled selected>
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
            <button className="book-donation-page-form-btn" type="submit">
              Donate
            </button>
          </form>
        </div>
        <div className="book-donation-page-guidelines">
          <span>Before donating, please check out the following guidelines:</span>
          <div className="book-donation-page-accordian">
            <Collapse defaultActiveKey={["1"]} onChange={onChange}>
              <Panel header="Step 1: Fill out the Donation Form" key="1">
                <p>{text1}</p>
              </Panel>
              <Panel
                header="Step 2: Arrange Delivery with Interested Parties"
                key="2"
              >
                <p>{text2}</p>
              </Panel>
              <Panel header="Step 3: Mark the Book as Donated" key="3">
                <p>{text3}</p>
              </Panel>
            </Collapse>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDonationPage;
