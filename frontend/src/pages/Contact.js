import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import Footer from "../components/Footer";

export default function Contact() {
  const cardRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 40,
      duration: 0.6,
      ease: "power3.out",
    });

    gsap.from(itemRefs.current, {
      opacity: 0,
      y: 20,
      stagger: 0.15,
      duration: 0.4,
      delay: 0.2,
      ease: "power2.out",
    });
  }, []);

  return (
    <>
      <style>
        {`
          .contact-page {
            min-height: 100vh;
            background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
            display: flex;
            flex-direction: column;
          }

          .contact-container {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px;
          }

          .contact-card {
            background: white;
            padding: 40px;
            width: 420px;
            border-radius: 12px;
            box-shadow: 0 15px 40px rgba(0,0,0,0.25);
            text-align: center;
          }

          .contact-card h2 {
            margin-bottom: 20px;
          }

          .contact-item {
            display: flex;
            align-items: center;
            gap: 12px;
            background: #f5f5f5;
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 15px;
            font-size: 0.95rem;
          }

          .contact-item svg {
            color: #1e88e5;
          }
        `}
      </style>

      <div className="contact-page">
        <div className="contact-container">
          <div className="contact-card" ref={cardRef}>
            <h2>Contact Us</h2>

            <div
              className="contact-item"
              ref={(el) => (itemRefs.current[0] = el)}
            >
              <FaEnvelope />
              support@courier.com
            </div>

            <div
              className="contact-item"
              ref={(el) => (itemRefs.current[1] = el)}
            >
              <FaPhoneAlt />
              +91 99999 88888
            </div>

            <div
              className="contact-item"
              ref={(el) => (itemRefs.current[2] = el)}
            >
              <FaMapMarkerAlt />
              Mumbai, India
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
