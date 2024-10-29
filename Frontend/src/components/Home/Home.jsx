import React from 'react';
import './Home.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="hero">
        <h1>Welcome to WhisperWeb</h1>
        <p>Connect with others anonymously and securely. Your secrets are safe with us.</p>
        <button className="cta-button">Get Started</button>
      </header>

      <section className="features">
        <h2>Features</h2>
        <div className="feature-item">
          <h3>Anonymous Chat</h3>
          <p>Chat with anyone without revealing your identity. Stay anonymous and enjoy your privacy.</p>
        </div>
        <div className="feature-item">
          <h3>Secure Connections</h3>
          <p>We use end-to-end encryption to ensure your conversations are private and secure.</p>
        </div>
        <div className="feature-item">
          <h3>User-Friendly Interface</h3>
          <p>Our platform is designed to be simple and easy to use, so you can focus on your conversations.</p>
        </div>
      </section>

      <section className="quote">
        <blockquote>
          "Privacy is not something that I'm merely entitled to, it's an absolute prerequisite." – Marlon Brando
        </blockquote>
      </section>
    </div>
  );
};

export default HomePage;
