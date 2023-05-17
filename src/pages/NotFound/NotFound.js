import React from "react";
import "./NotFound.css";
import backgroundImage from "../../assets/images/404-opt.png";
import { useNavigate } from "react-router-dom";
import MainButton from "../../components/button/button";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Programmatically navigate to the previous page
    navigate(-1);
  };

  return (
    <div className="not-found">
      <div className="not-found-content">
        <img src={backgroundImage} alt="404" />
        <MainButton
          name="GO BACK"
          className="not-found-button"
          onClick={handleButtonClick}
          style={{ backgroundColor: "var(--accent-color)" }}
          textColor="var(--secondary-color)"
          // font-weight= "700"
        />
      </div>
    </div>
  );
};

export default PageNotFound;

// const NotFound = () => {
//   const navigate = useNavigate();

//   const handleButtonClick = () => {
//     // Programmatically navigate to the About page
//     navigate(-1);
//   };
//   return (
//     <div className="not-found">
//       <div className="not-found-page-container">
//         <h1 className="not-found-heading">Oops!</h1>
//         <p className="e404">404 - page not found</p>
//         <p style={{ width: "400px", textAlign: "center", marginTop: "20px" }}>
//           The page you are looking for might have been removed, had its name changed,
//           or is temporarily unavailable.
//         </p>
//         <MainButton
//           name="GO BACK"
//           style={{ marginTop: "20px" }}
//           onClick={handleButtonClick}
//         />
//       </div>
//     </div>
//   );
// };

// export default NotFound;
