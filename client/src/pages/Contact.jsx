import React, { useState } from 'react';
import AlertMessage from '../components/common/AlertMessage';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 600);
  };

  return (
    <div className="py-5">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <span className="text-uppercase fw-bold small text-gold" style={{ letterSpacing: '2px' }}>
            🙏 Atithi Devo Bhava &bull; Royal Concierge & Inquiries
          </span>
          <h1 className="display-4 fw-bold font-serif mt-1 text-navy">Connect with HotelPro Palaces</h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '720px' }}>
            Our 24/7 Royal Khidmatgar and palace guest experience team are dedicated to ensuring every inquiry receives our undivided royal attention.
          </p>
        </div>

        <div className="row g-5 mb-5">
          {/* Contact Details & Hours */}
          <div className="col-lg-5">
            <div className="card border-0 rounded-4 shadow-sm p-4 p-md-5 bg-white h-100">
              <h4 className="fw-bold font-serif mb-4 text-navy">Royal Palace Contact</h4>

              <div className="d-flex flex-column gap-4 mb-4">
                <div className="d-flex align-items-start gap-3">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{ width: '48px', height: '48px', background: 'var(--hotel-gold-light)', color: 'var(--hotel-gold-dark)' }}
                  >
                    <i className="bi bi-geo-alt-fill fs-5"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Palace Location</h6>
                    <p className="text-muted small mb-0">
                      HotelPro Grand Palace & Heritage Resort<br />
                      Lake Pichola Road, Near City Palace<br />
                      Udaipur, Rajasthan 313001, India
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{ width: '48px', height: '48px', background: 'var(--hotel-gold-light)', color: 'var(--hotel-gold-dark)' }}
                  >
                    <i className="bi bi-telephone-fill fs-5"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Telephone & WhatsApp</h6>
                    <p className="text-muted small mb-0">
                      Palace Direct: +91 (0294) 555-4683<br />
                      Toll-Free (India): 1800 120 4683<br />
                      Concierge WhatsApp: +91 98110 23456
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{ width: '48px', height: '48px', background: 'var(--hotel-gold-light)', color: 'var(--hotel-gold-dark)' }}
                  >
                    <i className="bi bi-envelope-fill fs-5"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Electronic Inquiries</h6>
                    <p className="text-muted small mb-0">
                      Reservations: reservations@hotelpro.com<br />
                      Royal Concierge: concierge@hotelpro.com
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{ width: '48px', height: '48px', background: 'var(--hotel-gold-light)', color: 'var(--hotel-gold-dark)' }}
                  >
                    <i className="bi bi-clock-fill fs-5"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Darbar & Front Desk Hours</h6>
                    <p className="text-muted small mb-0">
                      Open 24 hours a day, 7 days a week, 365 days a year. (IST)
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-auto p-3 bg-light rounded-3 border">
                <small className="text-muted d-block">
                  <i className="bi bi-info-circle me-1 text-primary"></i>
                  <strong>Chauffeur & Airport Transfers:</strong> Complimentary pickup available from Maharana Pratap Airport (UDR) and Udaipur City Railway Station (UDZ) for suite guests.
                </small>
              </div>
            </div>
          </div>

          {/* Interactive Message Form */}
          <div className="col-lg-7">
            <div className="card border-0 rounded-4 shadow-sm p-4 p-md-5 bg-white">
              <h4 className="fw-bold font-serif mb-2 text-navy">Send Our Khidmatgar a Message</h4>
              <p className="text-muted small mb-4">
                Have a special request, destination wedding inquiry, or royal thali dietary preference? Reach out to our concierge.
              </p>

              {submitted && (
                <AlertMessage
                  variant="success"
                  message="Dhanyavaad! Your message has been received by our royal concierge team. We will respond promptly within 2 hours."
                  onClose={() => setSubmitted(false)}
                />
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya Sharma"
                      className="form-control"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">Your Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. ananya@example.com"
                      className="form-control"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold text-muted">Subject *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Private Lake Pichola Boat Charter or Pure Veg Thali Request"
                      className="form-control"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold text-muted">Your Message *</label>
                    <textarea
                      rows="5"
                      required
                      placeholder="How may our royal hospitality team make your upcoming stay memorable?"
                      className="form-control"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="col-12 mt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-navy btn-lg px-4 py-3 fw-bold fs-6 shadow-sm d-flex align-items-center gap-2"
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          <span>Transmitting Message...</span>
                        </>
                      ) : (
                        <>
                          <i className="bi bi-send-fill"></i>
                          <span>Send Message to Concierge</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="card border-0 rounded-4 shadow-sm p-4 p-md-5 bg-white">
          <div className="text-center mb-4">
            <h3 className="fw-bold font-serif text-navy">Frequently Asked Questions</h3>
            <p className="text-muted small">Everything you need to know about staying at HotelPro Heritage Palaces</p>
          </div>

          <div className="accordion accordion-flush" id="faqAccordion">
            <div className="accordion-item border-bottom py-2">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button collapsed fw-bold text-navy"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                >
                  What are the check-in and check-out timings?
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse"
                aria-labelledby="headingOne"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body text-muted small">
                  Standard guest check-in begins at 2:00 PM IST. Check-out is scheduled by 11:00 AM IST. Early check-in and late departures can be coordinated with our royal concierge subject to suite availability.
                </div>
              </div>
            </div>

            <div className="accordion-item border-bottom py-2">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed fw-bold text-navy"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  What identity proofs are mandatory for check-in?
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body text-muted small">
                  In compliance with Government of India regulations, all Indian citizens must present a valid government-issued photo ID with address proof (Aadhaar Card, Passport, Voter ID, or Driving License). <em>Please note: PAN cards are not accepted as valid address proof.</em> Foreign nationals must present an original Passport with a valid Indian Visa / OCI card.
                </div>
              </div>
            </div>

            <div className="accordion-item border-bottom py-2">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button collapsed fw-bold text-navy"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  Are Pure Vegetarian and Jain dining options available?
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body text-muted small">
                  Absolutely. Our palace kitchens include a dedicated, separate Pure Vegetarian culinary section prepared by traditional Maharaj chefs. Strict Jain meals (no onion, garlic, or root vegetables) and Sattvic Ayurvedic preparations are prepared fresh on request.
                </div>
              </div>
            </div>

            <div className="accordion-item border-bottom py-2">
              <h2 className="accordion-header" id="headingFour">
                <button
                  className="accordion-button collapsed fw-bold text-navy"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                >
                  How does reservation payment, UPI, and GST invoicing work?
                </button>
              </h2>
              <div
                id="collapseFour"
                className="accordion-collapse collapse"
                aria-labelledby="headingFour"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body text-muted small">
                  Your online booking instantly confirms your suite without requiring upfront card payments. You can settle your bill upon arrival via UPI (Google Pay, PhonePe, Paytm, BHIM), Indian & International credit/debit cards, or cash. An official Indian GST tax invoice (12% or 18% GST with GSTIN) is issued upon departure.
                </div>
              </div>
            </div>

            <div className="accordion-item py-2">
              <h2 className="accordion-header" id="headingFive">
                <button
                  className="accordion-button collapsed fw-bold text-navy"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFive"
                  aria-expanded="false"
                  aria-controls="collapseFive"
                >
                  Can I cancel my reservation if my travel plans change?
                </button>
              </h2>
              <div
                id="collapseFive"
                className="accordion-collapse collapse"
                aria-labelledby="headingFive"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body text-muted small">
                  Yes! You can cancel any booking with future check-in dates directly from your Customer Dashboard with one click. The suite will immediately be released back into palace inventory at zero hassle.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
