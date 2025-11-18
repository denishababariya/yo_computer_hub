import React from "react";
import { Container, Card } from "react-bootstrap";
import { FaShieldAlt, FaUserLock, FaFileContract } from "react-icons/fa";

export default function PrivacyPolicy() {
  return (
    <>
      {/* ===== DARK THEME CSS ===== */}
      <style>{`
        .d_pp-wrapper {
          background: #0e1117; 
          padding: 50px 0;
        }

        .d_pp-card {
          background: #161b22;
          border-radius: 16px;
          padding: 35px;
          color: #e5e5e5;
        }

        .d_pp-title {
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.5px;
        }

        .d_pp-heading {
          font-weight: 600;
          margin-bottom: 10px;
          color: #5588c9; 
          font-size: 1.25rem;
        }

        .d_pp-text {
          font-size: 1rem;
          line-height: 1.6;
          color: #cfcfcf;
        }

        .d_pp-list {
          padding-left: 1.2rem;
        }

        .d_pp-list li {
          padding: 5px 0;
          color: #cfcfcf;
          line-height: 1.6;
        }

        .d_pp-footer {
          font-size: 0.9rem;
          color: #999;
        }

        @media (max-width: 576px) {
          .d_pp-card {
            padding: 20px;
          }
          .d_pp-title {
            font-size: 1.5rem;
          }
        }
      `}</style>

      {/* ===== PAGE CONTENT ===== */}
      <div className="d_pp-wrapper">
        <Container>
          <Card className="shadow-lg border-0 d_pp-card">
            <h1 className="text-center mb-4 d_pp-title">
              <FaUserLock className="me-2" />
              Privacy Policy
            </h1>

            <section className="mb-4">
              <h4 className="d_pp-heading">
                <FaShieldAlt className="me-2" /> Introduction
              </h4>
              <p className="d_pp-text">
                Your privacy is very important to us. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your
                information when you visit or interact with our website.
              </p>
            </section>

            <section className="mb-4">
              <h4 className="d_pp-heading">
                <FaFileContract className="me-2" /> Information We Collect
              </h4>
              <ul className="d_pp-list">
                <li>Personal details like name, email, phone number.</li>
                <li>Billing and shipping information.</li>
                <li>Device data such as IP address and browser type.</li>
                <li>Purchase history and browsing activity.</li>
              </ul>
            </section>

            <section className="mb-4">
              <h4 className="d_pp-heading">How We Use Your Information</h4>
              <p className="d_pp-text">We use your information to:</p>
              <ul className="d_pp-list">
                <li>Process orders and payments.</li>
                <li>Improve our website and user experience.</li>
                <li>Send updates, offers, and newsletters.</li>
                <li>Ensure security and prevent fraud.</li>
              </ul>
            </section>

            <section className="mb-4">
              <h4 className="d_pp-heading">Sharing Your Information</h4>
              <p className="d_pp-text">
                We do not sell or trade your personal information. However, we
                may share your data with:
              </p>
              <ul className="d_pp-list">
                <li>Payment processors and shipping partners.</li>
                <li>Service providers for analytics & marketing.</li>
                <li>Authorities when required by law.</li>
              </ul>
            </section>

            <section className="mb-4">
              <h4 className="d_pp-heading">Data Security</h4>
              <p className="d_pp-text">
                We implement strong security measures to protect your data from
                unauthorized access, alteration, or disclosure. However, no
                online platform is 100% secure.
              </p>
            </section>

            <section className="mb-4">
              <h4 className="d_pp-heading">Your Choices & Rights</h4>
              <ul className="d_pp-list">
                <li>Request access or correction of your personal data.</li>
                <li>Opt out of marketing emails at any time.</li>
                <li>Delete or deactivate your account.</li>
                <li>Disable cookies via browser settings.</li>
              </ul>
            </section>

            <section className="mb-1">
              <h4 className="d_pp-heading">Updates to This Policy</h4>
              <p className="d_pp-text">
                We may update this Privacy Policy periodically. Continued use of
                the site means you accept the updated version.
              </p>
            </section>

            <p className="text-center mt-4 d_pp-footer">
              © {new Date().getFullYear()} Yo Computer Hub. All Rights Reserved.
            </p>
          </Card>
        </Container>
      </div>
    </>
  );
}
