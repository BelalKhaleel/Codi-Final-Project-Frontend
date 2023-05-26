import React from "react";
import "./TermsOfService.css";

const TermsOfServicePage = () => {
  return (
    <div className="terms-of-service-page">
      <h1 className="page-heading">Terms of Service</h1>
      <div className="section">
        <h2 className="section-heading">Introduction</h2>
        <ul className="section-list">
          <p>
          Welcome to bookup! These terms and conditions govern your use of our website and the services we provide. By accessing or using our website, you agree to be bound by these terms and conditions. If you do not agree with any part of these terms, please refrain from using our website.
          </p>
        </ul>
      </div>
      <div className="section">
        <h2 className="section-heading">User Responsibilities</h2>
        <ul className="section-list">
          <p>
            You are responsible for maintaining the confidentiality of your account credentials and for any activities that occur under your account.
          </p>
          <p>
            You agree not to engage in any unauthorized access, use, or distribution of our website and its content.
          </p>
        </ul>
      </div>
      <div className="section">
        <h2 className="section-heading">Intellectual Property</h2>
        <ul className="section-list">
          <p>
            All content on our website, including text, graphics, logos, and images, is the intellectual property of bookup and is protected by copyright laws. You may not reproduce, distribute, or modify any content from our website without our prior written consent.
          </p>
        </ul>
      </div>
      <div className="section">
        <h2 className="section-heading">User Contributions</h2>
        <ul className="section-list">
          <p>
            By submitting any content to our website, you grant us a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, modify, and distribute that content. You agree not to submit any content that infringes upon the rights of others or violates any applicable laws or regulations.
          </p>
        </ul>
      </div>
      <div className="section">
        <h2 className="section-heading">Limitations of Liability</h2>
        <ul className="section-list">
          <p>
            We strive to provide accurate and up-to-date information on our website, but we do not warrant the completeness, accuracy, or reliability of any content. In no event shall [Your Company Name] be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of our website.
          </p>
        </ul>
      </div>
      <div className="section">
        <h2 className="section-heading">Termination</h2>
        <ul className="section-list">
          <p>
            We reserve the right to terminate your access to our website at any time for any reason without prior notice.
          </p>
        </ul>
      </div>
      <div className="privacy-policy-section">
        <h2 className="section-heading">Privacy Policy</h2>
        <ul className="section-list">
          <li>
            Information Collection: We may collect personal information from you when you create an account, complete a form, or interact with our website. We also collect usage data such as your IP address, browser type, and pages visited for analytical purposes.
          </li>
          <li>
            Use of Information: We use the collected information to provide and improve our services, communicate with you, and personalize your experience on our website.
          </li>
          <li>
            Information Sharing: We may share your information with trusted third-party service providers who assist us in operating our website and delivering services to you. We will not sell, trade, or disclose your personal information to unaffiliated third parties without your consent, except as required by law.
          </li>
          <li>
            Data Security: We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, or alteration.
          </li>
          <li>
            User Rights: You have the right to access, update, or delete your personal information as outlined in our Privacy Policy.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
