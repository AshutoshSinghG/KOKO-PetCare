import React from 'react';
import './HomePage.css';

// Function to open the chatbot
const openChatbot = () => {
    if (window.openVetChatbot) {
        window.openVetChatbot();
    } else {
        window.dispatchEvent(new CustomEvent('openVetChatbot'));
    }
};

const HomePage = () => {
    return (
        <div className="home-page">
            {/* Navbar */}
            <nav className="navbar">
                <div className="logo">
                    <div className="logo-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4.5 12c0-1.57.75-2.96 1.91-3.84L5 6.5C3.78 7.64 3 9.24 3 11c0 1.76.78 3.36 2 4.5l1.41-1.66C5.25 12.96 4.5 11.57 4.5 12zm15 0c0 1.57-.75 2.96-1.91 3.84L19 17.5c1.22-1.14 2-2.74 2-4.5 0-1.76-.78-3.36-2-4.5l-1.41 1.66c1.16.88 1.91 2.27 1.91 3.84zM12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z" />
                            <circle cx="9" cy="10" r="1.5" />
                            <circle cx="15" cy="10" r="1.5" />
                            <path d="M12 17.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                        </svg>
                    </div>
                    <span>PawCare</span>
                </div>
                <ul className="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                <button className="nav-cta" onClick={openChatbot}>Book Now</button>
            </nav>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <div className="hero-badge">🐾 Trusted by 10,000+ Pet Parents</div>
                    <h1>Your Pet's Health,<br />Our <span className="highlight">Priority</span></h1>
                    <p>Expert veterinary care with a personal touch. Chat with our AI assistant for instant advice or book an appointment with our caring team.</p>
                    <div className="hero-buttons">
                        <button className="btn-primary" onClick={openChatbot}>
                            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                            </svg>
                            Chat with Assistant
                        </button>
                        <button className="btn-secondary">Learn More</button>
                    </div>
                    <div className="hero-stats">
                        <div className="stat">
                            <span className="stat-number">15+</span>
                            <span className="stat-label">Years Experience</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number">50k+</span>
                            <span className="stat-label">Happy Pets</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number">24/7</span>
                            <span className="stat-label">Emergency Care</span>
                        </div>
                    </div>
                </div>
                <div className="hero-image">
                    <div className="hero-image-container">
                        <img src="/images/hero-dog.png" alt="Happy golden retriever at vet clinic" />
                        <div className="floating-card card-1">
                            <span className="card-emoji">💉</span>
                            <span className="card-text">Vaccinations</span>
                        </div>
                        <div className="floating-card card-2">
                            <span className="card-emoji">❤️</span>
                            <span className="card-text">Regular Checkups</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="services" id="services">
                <div className="section-header">
                    <span className="section-tag">Our Services</span>
                    <h2>Complete Care for Your <span className="highlight">Furry Friends</span></h2>
                    <p>From routine checkups to emergency care, we provide comprehensive veterinary services</p>
                </div>
                <div className="services-grid">
                    <div className="service-card">
                        <div className="service-icon" style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)' }}>
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z" />
                            </svg>
                        </div>
                        <h3>Wellness Exams</h3>
                        <p>Regular health checkups to keep your pet in top condition and catch issues early.</p>
                    </div>
                    <div className="service-card">
                        <div className="service-icon" style={{ background: 'linear-gradient(135deg, #4ECDC4 0%, #6EE7DE 100%)' }}>
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                        </div>
                        <h3>Vaccinations</h3>
                        <p>Complete vaccination programs to protect your pets from preventable diseases.</p>
                    </div>
                    <div className="service-card">
                        <div className="service-icon" style={{ background: 'linear-gradient(135deg, #A855F7 0%, #C084FC 100%)' }}>
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </div>
                        <h3>Surgery</h3>
                        <p>State-of-the-art surgical facilities with experienced veterinary surgeons.</p>
                    </div>
                    <div className="service-card">
                        <div className="service-icon" style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)' }}>
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                            </svg>
                        </div>
                        <h3>Emergency Care</h3>
                        <p>24/7 emergency services for when your pet needs immediate medical attention.</p>
                    </div>
                </div>
            </section>

            {/* Pet Gallery Section */}
            <section className="gallery">
                <div className="gallery-content">
                    <div className="gallery-images">
                        <img src="/images/cat.png" alt="Happy orange cat" className="gallery-img-1" />
                        <img src="/images/puppy-checkup.png" alt="Puppy getting checkup" className="gallery-img-2" />
                    </div>
                    <div className="gallery-text">
                        <span className="section-tag">Why Choose Us</span>
                        <h2>We Treat Your Pets Like <span className="highlight">Family</span></h2>
                        <p>Our compassionate team of veterinarians and staff are dedicated to providing the highest quality care for your beloved companions.</p>
                        <ul className="feature-list">
                            <li>
                                <span className="check-icon">✓</span>
                                <span>Experienced & caring veterinary team</span>
                            </li>
                            <li>
                                <span className="check-icon">✓</span>
                                <span>Modern facilities & equipment</span>
                            </li>
                            <li>
                                <span className="check-icon">✓</span>
                                <span>Personalized treatment plans</span>
                            </li>
                            <li>
                                <span className="check-icon">✓</span>
                                <span>AI-powered 24/7 pet health assistant</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-content">
                    <h2>Ready to Give Your Pet the Best Care?</h2>
                    <p>Chat with our AI assistant for instant veterinary advice or book an appointment today!</p>
                    <div className="cta-buttons">
                        <button className="btn-primary btn-large" onClick={openChatbot}>
                            🐾 Book an Appointment
                        </button>
                        <button className="btn-outline" onClick={openChatbot}>
                            💬 Chat with AI Assistant
                        </button>
                    </div>
                </div>
                <div className="cta-decoration">
                    <div className="paw-print paw-1">🐾</div>
                    <div className="paw-print paw-2">🐾</div>
                    <div className="paw-print paw-3">🐾</div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-brand">
                        <div className="logo">
                            <div className="logo-icon">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z" />
                                    <circle cx="9" cy="10" r="1.5" />
                                    <circle cx="15" cy="10" r="1.5" />
                                    <path d="M12 17.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                                </svg>
                            </div>
                            <span>PawCare</span>
                        </div>
                        <p>Providing compassionate veterinary care for your beloved pets since 2010.</p>
                    </div>
                    <div className="footer-links">
                        <h4>Quick Links</h4>
                        <a href="#">Home</a>
                        <a href="#">Services</a>
                        <a href="#">About Us</a>
                        <a href="#">Contact</a>
                    </div>
                    <div className="footer-links">
                        <h4>Services</h4>
                        <a href="#">Wellness Exams</a>
                        <a href="#">Vaccinations</a>
                        <a href="#">Surgery</a>
                        <a href="#">Emergency</a>
                    </div>
                    <div className="footer-links">
                        <h4>Contact</h4>
                        <a href="#">📍 123 Pet Street</a>
                        <a href="#">📞 (555) 123-4567</a>
                        <a href="#">✉️ hello@pawcareeee.com</a>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© 2026 PawCare Veterinary. Made with ❤️ for pets everywhere.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
