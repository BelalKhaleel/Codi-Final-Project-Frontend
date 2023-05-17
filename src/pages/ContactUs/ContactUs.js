import React from "react";

const ContactUsPage = () => {
  return (
    <h1>ContactUsPage</h1>
  )
}

export default ContactUsPage;
// import React, { useRef, useState, useEffect } from "react";
// import emailjs from "emailjs-com";
// import {
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaPhone,
//   FaInstagram,
//   FaWhatsapp,
//   FaFacebook,
// } from "react-icons/fa";
// import "./ContactUs.css";
// import TextField from "../../components/text-field/text-field.js";
// import Swal from "sweetalert2";

// const ContactUs = () => {
//   const form = useRef();
//   const [err, setErr] = useState("");
//   const [data, setData] = useState({
//     email: "",
//     name: "",
//     message: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     const { value, name } = e.target;
//     setData({ ...data, [name]: value });
//   };

//   const sendEmail = async (e, err) => {
//     console.log(data, form.current);
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       if (data.email && data.name && data.message) {
//         await emailjs.sendForm(
//           "service_4142vbv",
//           "template_6uy649e",
//           form.current,
//           "CNu08EDHjEOkh-fre"
//         );
//         setData({
//           email: "",
//           name: "",
//           message: "",
//         });
//         Swal.fire({
//           icon: "success",
//           title: "Success",
//           html: "<span>Email Sent Successfully</span>",
//           timer: 1500,
//           timerProgressBar: true,
//           showCancelButton: false,
//           showConfirmButton: false,
//           color: "#fdfdfd",
//           background: "#810f05",
//         });
//       } else if (!data.name) {
//         setErr("Please Fill Your Name");
//         setTimeout(() => {
//           setErr("");
//         }, 2000);
//       } else if (!data.email) {
//         setErr("Please Fill Your Email");
//         setTimeout(() => {
//           setErr("");
//         }, 2000);
//       } else {
//         setErr("Your Message is reqiured");
//         setTimeout(() => {
//           setErr("");
//         }, 2000);
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: "warning",
//         title: "Failed",
//         html: `<span>${error.message}</span>`,
//         timer: 1500,
//         timerProgressBar: true,
//         showCancelButton: false,
//         showConfirmButton: false,
//         color: "#fdfdfd",
//         background: "#810f05",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   useEffect(() => {
//     if (!isSubmitting) {
//       return;
//     }

//     const timer = setTimeout(() => {
//       setData({
//         email: "",
//         name: "",
//         message: "",
//       });
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, [isSubmitting, data]);

//   return (
//     <div className="contact-us-page-container">
//       <div className="main-hero-section-contact">
//         <h2>Contact Us</h2>
//       </div>
//       <div className="contact-us-container">
//         <div className="contact-us-form-container">
//           <form ref={form} onSubmit={sendEmail}>
//             <fieldset>
//               <legend>Contact Us</legend>
//               <p className="error-message">{err}</p>
//               <div>
//                 <TextField
//                   type="text"
//                   id="name"
//                   label="Name"
//                   name="name"
//                   value={data.name}
//                   onChange={handleChange}
//                   style={{ width: "100%" }}
//                   placeholder="Enter your name"
//                   required={false}
//                 />
//               </div>
//               <div>
//                 <TextField
//                   type="email"
//                   label="Email"
//                   id="email"
//                   name="email"
//                   style={{ width: "100%" }}
//                   value={data.email}
//                   onChange={handleChange}
//                   placeholder="Enter your email"
//                   required={false}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="message">Message</label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   onChange={handleChange}
//                   placeholder="Your Message"
//                   value={data.message}
//                 />
//               </div>
//             </fieldset>
//             <div className="contact-us-form-submit-btn">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="contact-us-page-submit-button"
//               >
//                 {isSubmitting ? "Sending..." : "Send"}
//               </button>
//             </div>
//           </form>
//         </div>
//         <div className="get-in-touch">
//           <h2>Get in touch!</h2>
//           <p>
//             <a href="mailto:rawankrayyem97@gmail.com">
//               <i>
//                 <FaEnvelope />
//               </i>
//               rawankrayyem97@gmail.com
//             </a>
//           </p>
//           <p>
//             <a href="tel:+96170664460">
//               <i>
//                 <FaPhone />
//               </i>
//               +961-70664460
//             </a>
//           </p>
//           <p>
//             <a href="https://wa.me/96170664460">
//               <i>
//                 <FaWhatsapp />
//               </i>
//               whatsapp.com/rawankrayyem
//             </a>
//           </p>
//           <p>
//             <a href="https://www.facebook.com/RMZNA.embroidery/">
//               <i>
//                 <FaFacebook />
//               </i>
//               facebook.com/RMZNA
//             </a>
//           </p>
//           <p>
//             <a href="https://www.instagram.com/rmzna_/">
//               <i>
//                 <FaInstagram />
//               </i>
//               instagram.com/rmzna
//             </a>
//           </p>
//           <p>
//             <i>
//               <FaMapMarkerAlt />
//             </i>
//             Tripoli, Lebanon
//           </p>
//         </div>
//       </div>
//       <div className="map-container">
//         <div className="map">
//           <iframe
//             title="Google Maps showing the location of our client"
//             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52655.44585789661!2d35.804625029112636!3d34.42763484227541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1521f6ab9db89d33%3A0x323c52527dde8578!2sTripoli!5e0!3m2!1sen!2slb!4v1683204980380!5m2!1sen!2slb"
//             width="600"
//             height="450"
//             style={{ border: 0 }}
//             allowfullscreen=""
//             loading="lazy"
//             referrerpolicy="no-referrer-when-downgrade"
//           ></iframe>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;
