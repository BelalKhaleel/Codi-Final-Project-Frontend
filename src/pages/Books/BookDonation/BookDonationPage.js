import React, { useState } from "react";
import axios from "axios";
import "./BookDonationPage.css";
import { Collapse } from "antd";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
// import jwt from 'jsonwebtoken';

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
  const [cookies] = useCookies();
  

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
                <option value="" valuedisabled="true" >
                  Select the university
                </option>
                
                <option value="646b1e5b5caab8a2ecc44b90">
                  Al Jinan University (JU)
                </option>
                <option value="646b1e9f5caab8a2ecc44ba2">
                  Al-Kafaat University (AKU)
                </option>
                <option value="646b1da25caab8a2ecc44b63">
                  American University of Beirut (AUB)
                </option>
                <option value="646b1ecf5caab8a2ecc44bae">
                  American University of Culture and Education (AUCE)
                </option>
                <option value="646b1e895caab8a2ecc44b9c">
                  American University of Science & Technology (AUST)
                </option>
                <option value="646b1e7e5caab8a2ecc44b99">
                  American University of Technology (AUT)
                </option>
                <option value="646b1e515caab8a2ecc44b8d">
                  Antonine University (UA)
                </option>
                <option value="646b1e2d5caab8a2ecc44b84">
                  Arab Open University (AOU)
                </option>
                <option value="646b1ec55caab8a2ecc44bab">
                  Arts, Sciences & Technology University in Lebanon (AUL)
                </option>
                <option value="646b1f1d5caab8a2ecc44bc3">
                  Azm University (Azm)
                </option>
                <option value="646b1da25caab8a2ecc44b63">
                  Beirut Arab University (BAU)
                </option>
                <option value="646b1e655caab8a2ecc44b93">
                  City University (CityU)
                </option>
                <option value="646b1e3a5caab8a2ecc44b87">
                  Global University (GU)
                </option>
                <option value="646b1dcc5caab8a2ecc44b6c">
                  Haigazian University (Haigazian)
                </option>
                <option value="646b1eef5caab8a2ecc44bb7">
                  Holy Family University - Université Sainte Famille (USF)
                </option>
                <option value="646b1f285caab8a2ecc44bc6">
                  International University of Beirut (BIU)
                </option>
                <option value="646b1e485caab8a2ecc44b8a">
                  Islamic University of Lebanon (IUL)
                </option>
                <option value="646b1def5caab8a2ecc44b75">
                  La Sagesse University (ULS)
                </option>
                <option value="646b1dc05caab8a2ecc44b69">
                  Lebanese American University (LAU)
                </option>
                <option value="646b1f0c5caab8a2ecc44bc0">
                  Lebanese Canadian University (LCU)
                </option>
                <option value="646b1de15caab8a2ecc44b72">
                  Lebanese German University (LGU)
                </option>
                <option value="646b1e045caab8a2ecc44b7e">
                  Lebanese International University (LIU)
                </option>
                <option value="646b1d925caab8a2ecc44b60">
                  Lebanese University (LU)
                </option>
                <option value="646b1e7e5caab8a2ecc44b99">
                  Maaref University (MU)
                </option>
                <option value="646b1eb85caab8a2ecc44ba8">
                  Middle East University (MEU)
                </option>
                <option value="646b1e2d5caab8a2ecc44b84">
                  Modern University for Business & Sciences (MUBS)
                </option>
                <option value="646b1dfb5caab8a2ecc44b78">
                  Notre Dame University (NDU)
                </option>
                <option value="646b1f4a5caab8a2ecc44bce">
                  Phoenicia University (PU)
                </option>
                <option value="646b1e515caab8a2ecc44b8d">
                  Rafic Hariri University (RHU)
                </option>
                <option value="646b1d925caab8a2ecc44b60">
                  Saint Joseph University (USJ)
                </option>
                <option value="646b1e785caab8a2ecc44b96">
                  The Holy Spirit University of Kaslik (USEK)
                </option>
                <option value="646b1ed85caab8a2ecc44bb4">
                  Université Libano-Française de Technologie et des Sciences
                  Appliqués (ULF)
                </option>
                <option value="646b1ddc5caab8a2ecc44b66">
                  University of Balamand (UOB)
                </option>
                <option value="646b1ee55caab8a2ecc44bb1">
                  University of Sciences &Arts in Lebanon (USAL)
                </option>
                <option value="646b1da25caab8a2ecc44b63">
                  University of Tripoli (UT)
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
                <option value="" valuedisabled="true" >
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
                <option value="" valuedisabled="true" >
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
