import React from 'react';
import '../assets/css/footer.css';

const Footer = () => {
  const footerLinks = [
    { title: 'lorem', links: ['lorem', 'lorem', 'lorem', 'lorem'] },
    { title: 'lorem', links: ['lorem', 'lorem', 'lorem', 'lorem'] },
    { title: 'lorem', links: ['lorem', 'lorem', 'lorem', 'lorem'] },
  ];

  return (
    <footer className="footer">
      <div className="footer-content container">
        {footerLinks.map((section, index) => (
          <div key={index} className="link">
            <h3>{section.title}</h3>
            <ul>
              {section.links.map((link, i) => (
                <li key={i}><a href="#">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;