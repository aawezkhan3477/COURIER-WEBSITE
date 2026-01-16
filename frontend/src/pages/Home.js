import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import { FaTruck, FaBox, FaRoute } from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();

  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const truckRef = useRef(null);
  const lineRef = useRef(null);
  const featuresRef = useRef([]);

  useEffect(() => {
    // Hero entry animation
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(heroRef.current, { opacity: 0, duration: 0.6 })
      .from(titleRef.current, { y: -30, opacity: 0, duration: 0.6 })
      .from(textRef.current, { y: 20, opacity: 0, duration: 0.4 }, "-=0.3")
      .from(
        featuresRef.current,
        { y: 20, opacity: 0, stagger: 0.2, duration: 0.4 },
        "-=0.2"
      );

    // Logistics glowing line animation
    gsap.to(lineRef.current, {
      backgroundPositionX: "200%",
      duration: 2.5,
      repeat: -1,
      ease: "linear",
    });

    // 🚚 Continuous truck movement (core requirement)
    gsap.to(truckRef.current, {
      x: 260,
      duration: 4,
      repeat: -1,
      ease: "linear",
    });
  }, []);

  return (
    <>
      {/* Styles */}
      <style>
        {`
          body {
            margin: 0;
            font-family: Arial, sans-serif;
          }

          .home-page {
            min-height: 100vh;
            background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
            color: white;
            padding-top: 80px;
          }

          .hero {
            text-align: center;
            padding: 40px 20px;
          }

          .hero h1 {
            font-size: 3rem;
            margin-bottom: 15px;
          }

          .hero p {
            max-width: 600px;
            margin: auto;
            font-size: 1.2rem;
            opacity: 0.9;
          }

          .track-btn {
            margin-top: 25px;
            padding: 14px 36px;
            font-size: 1rem;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            background: linear-gradient(135deg, #00c6ff, #0072ff);
            color: white;
          }

          /* Logistics animation */
          .logistics {
            margin: 60px auto;
            width: 320px;
            position: relative;
          }

          .route-line {
            height: 4px;
            width: 100%;
            background: linear-gradient(
              90deg,
              transparent,
              #00e5ff,
              transparent
            );
            background-size: 200% 100%;
            border-radius: 4px;
          }

          .truck {
            position: absolute;
            top: -20px;
            left: 0;
            font-size: 2rem;
            color: #ffeb3b;
          }

          /* Features */
          .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 20px;
            padding: 40px;
            max-width: 1000px;
            margin: auto;
          }

          .feature-card {
            background: rgba(255,255,255,0.08);
            padding: 25px;
            border-radius: 10px;
            text-align: center;
            backdrop-filter: blur(6px);
          }

          .feature-card svg {
            font-size: 2rem;
            margin-bottom: 10px;
            color: #00c6ff;
          }
        `}
      </style>

      <div className="home-page">
        {/* Hero */}
        <div className="hero" ref={heroRef}>
          <h1 ref={titleRef}>Smart Courier & Logistics Platform</h1>
          <p ref={textRef}>
            Real-time shipment tracking, secure deliveries, and intelligent
            logistics management — all in one platform.
          </p>

          <button
            className="track-btn"
            onClick={() => navigate("/track")}
          >
            Track Your Package
          </button>
        </div>

        {/* 🚚 Logistics animation */}
        <div className="logistics">
          <div className="route-line" ref={lineRef}></div>
          <div className="truck" ref={truckRef}>
            <FaTruck />
          </div>
        </div>

        {/* Features */}
        <div className="features">
          {[
            {
              icon: <FaRoute />,
              title: "Live Tracking",
              desc: "Track shipments in real-time across cities.",
            },
            {
              icon: <FaBox />,
              title: "Secure Handling",
              desc: "Industry-grade package safety & monitoring.",
            },
            {
              icon: <FaTruck />,
              title: "Fast Delivery",
              desc: "Optimized routes for faster deliveries.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="feature-card"
              ref={(el) => (featuresRef.current[i] = el)}
            >
              {f.icon}
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
