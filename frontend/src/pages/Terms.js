import React from "react";
import { Container, Card } from "react-bootstrap";
import { FaShieldAlt, FaClipboardList, FaUserShield } from "react-icons/fa";

export default function Terms() {
  return (
    <>
      {/* ===== DARK THEME CSS ===== */}
      <style>{`
        .d_tc-wrapper {
          background: #0e1117; /* dark bg */
          padding: 50px 0;
        }

        .d_tc-card {
          background: #161b22; /* dark card */
          border-radius: 16px;
          padding: 35px;
          color: #e5e5e5;
        }

        .d_tc-title {
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.5px;
        }

        .d_tc-heading {
          font-weight: 600;
          margin-bottom: 10px;
          color: #5588c9; /* your theme color */
          font-size: 1.25rem;
        }

        .d_tc-text {
          font-size: 1rem;
          line-height: 1.6;
          color: #cfcfcf;
        }

        .d_tc-list {
          padding-left: 1.2rem;
        }

        .d_tc-list li {
          padding: 5px 0;
          color: #cfcfcf;
          line-height: 1.6;
        }

        .d_tc-footer {
          font-size: 0.9rem;
          color: #999;
        }

        @media (max-width: 576px) {
          .d_tc-card {
            padding: 20px;
          }
          .d_tc-title {
            font-size: 1.5rem;
          }
        }
      `}</style>

      {/* ===== PAGE CONTENT ===== */}
      <div className="d_tc-wrapper">
        <Container>
          <Card className="shadow-lg border-0 d_tc-card">
            <h1 className="text-center mb-4 d_tc-title">
              <FaClipboardList className="me-2" />
              Terms & Conditions
            </h1>

            <section className="mb-4">
              <h4 className="d_tc-heading">
                <FaShieldAlt className="me-2" /> Introduction
              </h4>
              <p className="d_tc-text">
                Welcome to our website. By accessing or using our platform, you
                agree to follow the Terms & Conditions listed here. Please read
                them carefully before continuing to use any of our services.
              </p>
            </section>

            <section className="mb-4">
              <h4 className="d_tc-heading">
                <FaUserShield className="me-2" /> User Responsibilities
              </h4>
              <ul className="d_tc-list">
                <li>Provide accurate, updated, and complete information.</li>
                <li>Do not misuse, hack, or disrupt any service.</li>
                <li>Respect intellectual property and website security.</li>
                <li>Follow all rules and policies while using the website.</li>
              </ul>
            </section>

            <section className="mb-4">
              <h4 className="d_tc-heading">Use of Our Services</h4>
              <p className="d_tc-text">
                Our services must be used only for lawful purposes. We have the
                right to suspend or block users who violate terms, attempt fraud,
                or misuse our platform's resources.
              </p>
            </section>

            <section className="mb-4">
              <h4 className="d_tc-heading">Intellectual Property</h4>
              <p className="d_tc-text">
                All content—images, text, logos, graphics, and designs—belongs
                to our company unless stated otherwise. You may not reproduce,
                modify, or redistribute content without written permission.
              </p>
            </section>

            <section className="mb-4">
              <h4 className="d_tc-heading">Limitation of Liability</h4>
              <p className="d_tc-text">
                We are not responsible for damages such as data loss, service
                interruptions, or unauthorized access caused by third parties.
              </p>
            </section>

            <section className="mb-4">
              <h4 className="d_tc-heading">Changes to Terms</h4>
              <p className="d_tc-text">
                These Terms & Conditions may be updated at any time. Your
                continued use of the website means you accept all changes.
              </p>
            </section>

            <section className="mb-1">
              <h4 className="d_tc-heading">Contact Us</h4>
              <p className="d_tc-text">
                If you have any questions regarding these Terms & Conditions,
                please contact our support team for assistance.
              </p>
            </section>

            <p className="text-center mt-4 d_tc-footer">
              © {new Date().getFullYear()} Yo Computer Hub. All Rights Reserved.
            </p>
          </Card>
        </Container>
      </div>
    </>
  );
}
