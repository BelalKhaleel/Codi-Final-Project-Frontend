// import React, { useState, useContext } from "react";
// import { isLoggedIn } from "../../App";
// import { useNavigate } from "react-router-dom";
// import TextField from "../../components/text-field/text-field";
// import MainButton from "../../components/button/button";
// import "./UserLogin.css";
// import axios from "axios";
// import Spinner from "../../components/spinner/spinner";
// import cookie from "react-cookies";
// import Swal from "sweetalert2";

// const UserLoginPage = () => {
//   const navigate = useNavigate();

//   const handleButtonClick = () => {
//     if (isAdmin) {
//       navigate("/dashboard"); // Redirect to admin dashboard
//     } else {
//       navigate(-1); // Navigate back to the previous page for non-admin users
//     }
//   };
  
//   const [loggedIn, setLoggedIn] = useContext(isLoggedIn);
//   const [signup, setSignup] = useState(false);
//   const [userSignup, setUserSignup] = useState({
//     fullName: "",
//     phoneNumber: "",
//     address: "",
//     phone: "",
//     email: "",
//     password: "",
//   });

//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState({
//     error: "",
//   });

//   const [email, setEmail] = useState("");
//   const [isValid, setIsValid] = useState(true);
//   const [isAdmin, setIsAdmin] = useState(false);

//   const emptySignupTextFields = () => {
//     setUserSignup({
//       fullName: "",
//       address: "",
//       phoneNumber: "",
//       email: "",
//       password: "",
//     });
//   };

//   const handleInputChange = (event) => {
//     setEmail(event.target.value);
//     setIsValid(validateEmail(email));
//   };

//   const handleSignUpChange = (event) => {
//     const value = event.target.value;
//     setUserSignup({ ...userSignup, [event.target.name]: value });
//   };

//   const handleCombinedChange = (event) => {
//     handleInputChange(event);
//     handleSignUpChange(event);
//   };

//   const SignUp = async () => {
//     const signUp = {
//       fullName: userSignup.fullName,
//       address: userSignup.address,
//       phoneNumber: userSignup.phoneNumber,
//       email: userSignup.email,
//       password: userSignup.password,
//     };
//     setErrorMessage({ error: "" });
//     setIsLoading(true);
//     try {
//       await axios.post(
//         `${process.env.REACT_APP_API_URL}/api/user/register`,
//         signUp,
//         { withCredentials: true }
//       );
//       setIsLoading(false);
//       setUserSignup({
//         fullName: "",
//         address: "",
//         phoneNumber: "",
//         email: "",
//         password: "",
//       });
//       setSignup(false);
//       Swal.fire({
//         icon: 'success',
//         title: 'Registration Successful',
//         text: "You have successfully registered!",
//         timer: 1500,
//         timerProgressBar: true,
//         showCancelButton: false,
//         showConfirmButton: false,
//         color: '#fdfdfd',
//         background: '#810f05',
//       });
//     } catch (e) {
//       console.log(e);
//       setErrorMessage({ error: e.response.data.message });
//       setIsLoading(false);
//     }
//   };

  
//   const validateEmail = () => {
//     // Regular expression for email validation
//     const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     console.log(email);
//     return emailRegex.test(email);
//   };

//   return (
//     <div className="user-login-page">
//       {/* <div className="user-login-background-effect-left"></div> */}

//       <div className="user-login-page-container">
//         <div className="user-login-page-image"></div>
//           <div
//             className="user-login-page-form"
//             // style={{ padding: "20px 80px" }}
//           >
//             {/* <div className="user-login-page-logo" style={{ marginBottom: 0 }}>
//               <img
//                 src={logo}
//                 alt="bookup-logo"
//                 width="100%"
//                 height="100%"
//                 style={{ objectFit: "cover" }}
//               />
//             </div> */}
//             <h2
//               className="user-login-page-title"
//               style={{ marginBottom: "30px" }}
//             >
//               Sign Up
//             </h2>
//             <form className="user-login-page-input" style={{ gap: "20px" }}>
//               <div
//                 style={{
//                   color: "var(--accent-color)",
//                   textAlign: "center",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => {
//                   setErrorMessage("");
//                   setIsValid(true);
//                 }}
//               >
//                 {errorMessage.error}
//                 {isValid ? null : (
//                   <p>Invalid Email Address{console.log(isValid)}</p>
//                 )}
//               </div>
//               <div className="user-login-page-email">
//                 <TextField
//                   label="Full Name"
//                   type="text"
//                   placeholder="Please enter your full name"
//                   required={true}
//                   style={{ fontSize: "16px", padding: "15px" }}
//                   name="fullName"
//                   onChange={handleSignUpChange}
//                   value={userSignup.fullName}
//                 />
//               </div>
//               <div className="user-login-page-address-phone">
//                 <div>
//                   <TextField
//                     label="Address"
//                     type="text"
//                     placeholder="Address (optional)"
//                     // required={true}
//                     style={{ fontSize: "16px", padding: "15px" }}
//                     name="address"
//                     onChange={handleSignUpChange}
//                     value={userSignup.address}
//                   />
//                 </div>
//                 <div>
//                   <TextField
//                     label="Phone"
//                     type="tel"
//                     placeholder="+961 xx xxxxxx"
//                     required={true}
//                     style={{ fontSize: "16px", padding: "15px" }}
//                     name="phoneNumber"
//                     onChange={handleSignUpChange}
//                     value={userSignup.phoneNumber}
//                   />
//                 </div>
//               </div>
//               <div>
//                 <TextField
//                   label="Email"
//                   type="email"
//                   placeholder="example@mail.com"
//                   required={true}
//                   style={{ fontSize: "16px", padding: "15px" }}
//                   name="email"
//                   onChange={handleCombinedChange}
//                   value={userSignup.email}
//                 />
//               </div>
//               <div className="user-login-page-password">
//                 <TextField
//                   label="Password"
//                   type="password"
//                   placeholder="********"
//                   required={true}
//                   style={{ fontSize: "16px", padding: "15px" }}
//                   name="password"
//                   onChange={handleSignUpChange}
//                   value={userSignup.password}
//                 />
//               </div>
//               <div className="user-login-page-button">
//                 <MainButton
//                   name="Sign Up"
//                   style={{ padding: "15px 20px" }}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     SignUp();
//                   }}
//                 />
//                 {isLoading && (
//                   <Spinner
//                     style={{
//                       width: "20px",
//                       height: "20px",
//                       marginLeft: "10px",
//                     }}
//                   />
//                 )}
//               </div>
//               <div>
//                 <p
//                   onClick={() => {
//                     setSignup(false);
//                     emptySignupTextFields();
//                   }}
//                   className="user-login-page-signup-nav"
//                 >
//                   Already have an account? login
//                 </p>
//               </div>
//             </form>
//           </div>
//       </div>
//     </div>
//   );
// };

// export default UserLoginPage;