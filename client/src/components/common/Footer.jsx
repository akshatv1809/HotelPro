import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-5">
      <div className="container">
        <div className="row g-4 mb-4">
          {/* Brand Info */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="fs-3">🏛️</span>
              <span className="brand-title text-white">
                Hotel<span style={{ color: 'var(--hotel-gold)' }}>Pro</span>
              </span>
            </div>
            <p className="text-light opacity-75 small pe-lg-4 mb-2">
              <strong>अतिथि देवो भव: (Atithi Devo Bhava)</strong> — Experience the timeless opulence of royal Indian hospitality. From regal palace suites overlooking lake vistas to restorative Ayurvedic wellness therapies.
            </p>
            <small className="text-warning d-block mb-3">
              Udaipur &bull; Jaipur &bull; Kerala Backwaters &bull; Goa
            </small>
            <div className="d-flex gap-3 fs-5 text-light">
              <a href="#" className="text-light opacity-75 text-decoration-none hover-gold"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-light opacity-75 text-decoration-none hover-gold"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-light opacity-75 text-decoration-none hover-gold"><i className="bi bi-twitter-x"></i></a>
              <a href="#" className="text-light opacity-75 text-decoration-none hover-gold"><i className="bi bi-youtube"></i></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h6 className="text-uppercase fw-bold mb-3" style={{ color: 'var(--hotel-gold)' }}>
              Explore
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><Link to="/" className="text-light text-decoration-none opacity-75">Home</Link></li>
              <li><Link to="/rooms" className="text-light text-decoration-none opacity-75">Palaces & Suites</Link></li>
              <li><Link to="/about" className="text-light text-decoration-none opacity-75">Royal Heritage</Link></li>
              <li><Link to="/contact" className="text-light text-decoration-none opacity-75">Concierge & FAQ</Link></li>
              <li><Link to="/dashboard" className="text-light text-decoration-none opacity-75">Guest Portal</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="col-lg-3 col-md-6">
            <h6 className="text-uppercase fw-bold mb-3" style={{ color: 'var(--hotel-gold)' }}>
              Palace Concierge
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small text-light opacity-75">
              <li className="d-flex gap-2">
                <i className="bi bi-geo-alt-fill text-warning"></i>
                <span>HotelPro Grand Palace, Lake Pichola Road, Udaipur, Rajasthan 313001, India</span>
              </li>
              <li className="d-flex gap-2">
                <i className="bi bi-telephone-fill text-warning"></i>
                <span>+91 (0294) 555-4683 / +91 98110 23456</span>
              </li>
              <li className="d-flex gap-2">
                <i className="bi bi-envelope-fill text-warning"></i>
                <span>namaste@hotelpro.in</span>
              </li>
              <li className="d-flex gap-2">
                <i className="bi bi-clock-fill text-warning"></i>
                <span>24/7 Royal Khidmatgar & Front Desk</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="col-lg-3 col-md-6">
            <h6 className="text-uppercase fw-bold mb-3" style={{ color: 'var(--hotel-gold)' }}>
              Royal Privileges
            </h6>
            <p className="text-light opacity-75 small">
              Join the HotelPro Royal Circle for festive season privileges, heritage retreat invitations, and member tariffs.
            </p>
            {subscribed ? (
              <div className="alert alert-success py-2 px-3 small rounded-3">
                <i className="bi bi-check-circle me-1"></i> Namaste! Welcome to Royal Privileges.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="d-flex flex-column gap-2">
                <div className="input-group">
                  <input
                    type="email"
                    required
                    className="form-control form-control-sm"
                    placeholder="Enter email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                  />
                  <button className="btn btn-gold btn-sm" type="submit">
                    Join
                  </button>
                </div>
                <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                  Compliant with Indian digital privacy guidelines.
                </small>
              </form>
            )}
          </div>
        </div>

        <hr className="border-secondary opacity-25 my-4" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 small text-light opacity-75">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} HotelPro Palaces & Resorts Pvt. Ltd. All rights reserved. GST Registered.
          </p>
          <div className="d-flex gap-3">
            <a href="#privacy" className="text-light text-decoration-none">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#terms" className="text-light text-decoration-none">Terms of Stay</a>
            <span>&bull;</span>
            <a href="#tariffs" className="text-light text-decoration-none">Govt ID Norms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
