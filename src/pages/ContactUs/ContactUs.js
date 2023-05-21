import React, { useRef, useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import ContactUsImage from '../../assets/images/contact-us.png';
import {
  // FaEnvelope,
  // FaMapMarkerAlt,
  // FaPhone,
  // FaInstagram,
  // FaWhatsapp,
  // FaFacebook,
} from "react-icons/fa";
import "./ContactUs.css";
import TextField from "../../components/text-field/text-field.js";
import Swal from "sweetalert2";

const ContactUs = () => {
  const form = useRef();
  const [err, setErr] = useState("");
  const [data, setData] = useState({
    email: "",
    name: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  const sendEmail = async (e, err) => {
    console.log(data, form.current);
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (data.email && data.name && data.message) {
        await emailjs.send(
          "service_4142vbv",
          "template_6uy649e",
          {
            name: data.name,
            message: data.message
          },
          "CNu08EDHjEOkh-fre"
        );
        setData({
          email: "",
          name: "",
          message: "",
        });
        Swal.fire({
          icon: "success",
          title: "Success",
          html: "<span>Email Sent Successfully</span>",
          timer: 1500,
          timerProgressBar: true,
          showCancelButton: false,
          showConfirmButton: false,
          color: "#fdfdfd",
          background: "#810f05",
        });
      } else if (!data.name) {
        setErr("Please Fill Your Name");
        setTimeout(() => {
          setErr("");
        }, 2000);
      } else if (!data.email) {
        setErr("Please Fill Your Email");
        setTimeout(() => {
          setErr("");
        }, 2000);
      } else {
        setErr("Your Message is reqiured");
        setTimeout(() => {
          setErr("");
        }, 2000);
      }
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: "Failed",
        html: `<span>${error.message}</span>`,
        timer: 1500,
        timerProgressBar: true,
        showCancelButton: false,
        showConfirmButton: false,
        color: "#fdfdfd",
        background: "#810f05",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isSubmitting) {
      return;
    }

    const timer = setTimeout(() => {
      setData({
        email: "",
        name: "",
        message: "",
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [isSubmitting, data]);

  return (
    <div className="contact-us-page-container">
      <div className="main-hero-section-contact">
        <h2>Contact Us</h2>
      </div>
      <div className="contact-us-container">
        <div className="contact-us-form-container">
          <form ref={form} onSubmit={sendEmail}>
            <fieldset>
              <legend>Contact Us</legend>
              <p className="error-message">{err}</p>
              <div>
                <TextField
                  type="text"
                  id="name"
                  label="Name"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                  placeholder="Enter your name"
                  required={false}
                />
              </div>
              <div>
                <TextField
                  type="email"
                  label="Email"
                  id="email"
                  name="email"
                  style={{ width: "100%" }}
                  value={data.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required={false}
                />
              </div>
              <div>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  onChange={handleChange}
                  placeholder="Your Message"
                  value={data.message}
                />
              </div>
            </fieldset>
            <div className="contact-us-form-submit-btn">
              <button
                type="submit"
                disabled={isSubmitting}
                className="contact-us-page-submit-button"
              >
                {isSubmitting ? "Sending..." : "Send"}
              </button>
            </div>
          </form>
        </div>
        <div className="contact-us-image-container">
          <img className="contact-us-image" src={ContactUsImage} alt="contact-us" />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
