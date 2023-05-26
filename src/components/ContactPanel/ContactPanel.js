import React, { useState } from 'react';
import styles from './ContactPanel.module.css';
import '@fortawesome/fontawesome-free/css/all.css';

const ContactPanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleContactPanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles['contact-wrapper']} ${isOpen ? styles['contact-wrapper--open'] : ''}`}>
      <div className={styles['contact-panel']}>
        <div className={styles['contact-panel__header']}>
          Contact
        </div>

        <button className={styles['contact-close']} onClick={toggleContactPanel}>
          <i className="fa fa-times"></i>
        </button>

        <ul>
          <li>
            <a href="https://markodenic.com" target="_blank">
              <i className="fa fa-link"></i>
            </a>
          </li>

          <li>
            <a href="https://www.getrevue.co/profile/denicmarko" target="_blank">
              <i className="fa fa-envelope-o"></i>
            </a>
          </li>

          <li>
            <a href="https://www.youtube.com/channel/UCRgyPAKycnp_kkpny_uZBcQ" target="_blank">
              <i className="fa fa-youtube"></i>
            </a>
          </li>

          <li>
            <a href="https://github.com/markodenic" target="_blank">
              <i className="fa fa-github"></i>
            </a>
          </li>
        </ul>
      </div>
      <button className={styles['contact-button']} onClick={toggleContactPanel}>
        Get in Touch
      </button>
    </div>
  );
};

export default ContactPanel;
