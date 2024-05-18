import React from 'react';
import '../style/footer.css'

const Footer = () => {
  return (
    <footer>
      <div className="footer_container">
        <p><a href="mailto:namelessl@uw.edu" className="coursedetail-link">nameless@uw.edu</a></p>
        <p><a href="tel:123-4567-8888">123&#8209;4567&#8209;8888</a></p>
        <p>&copy;2024 Nameless All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;

