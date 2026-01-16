import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FaSearchLocation, FaBoxOpen, FaTruck } from "react-icons/fa";

export default function Track() {
  const [id, setId] = useState("");
  const [status, setStatus] = useState("");

  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const inputRef = useRef(null);
  const buttonRef = useRef(null);
  const statusRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(cardRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.6,
    })
      .from(titleRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.5,
      })
      .from(
        [inputRef.current, buttonRef.current],
        {
          y: 20,
          opacity: 0,
          stagger: 0.15,
          duration: 0.4,
        },
        "-=0.3"
      );

    gsap.to(lineRef.current, {
      backgroundPositionX: "200%",
      duration: 3,
      repeat: -1,
      ease: "linear",
    });
  }, []);

  useEffect(() => {
    if (status && statusRef.current) {
      gsap.fromTo(
        statusRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
    }
  }, [status]);

  return (
    <>
      {/* Styles */}
      <style>
        {`
          body {
            margin: 0;
            font-family: Arial, sans-serif;
          }

          .track-page {
            height: 100vh;
            background: radial-gradient(circle at top, #0f2027, #203a43, #2c5364);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            overflow: hidden;
          }

          .glow-line {
            position: absolute;
            top: 50%;
            width: 100%;
            height: 2px;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(0,255,255,0.8),
              transparent
            );
            background-size: 200% 100%;
            z-index: 1;
          }

          .track-card {
            position: relative;
            background: rgba(255,255,255,0.08);
            backdrop-filter: blur(10px);
            padding: 40px;
            width: 380px;
            border-radius: 12px;
            box-shadow: 0 15px 40px rgba(0,0,0,0.4);
            z-index: 2;
          }

          .track-card h2 {
            text-align: center;
            margin-bottom: 25px;
            font-size: 1.8rem;
          }

          .input-group {
            display: flex;
            align-items: center;
            background: rgba(255,255,255,0.15);
            border-radius: 8px;
            padding: 12px;
            margin-bottom: 20px;
          }

          .input-group input {
            border: none;
            background: transparent;
            outline: none;
            margin-left: 10px;
            width: 100%;
            color: white;
            font-size: 1rem;
          }

          .input-group input::placeholder {
            color: #ddd;
          }

          .track-btn {
            width: 100%;
            padding: 12px;
            border: none;
            border-radius: 8px;
            background: linear-gradient(135deg, #00c6ff, #0072ff);
            color: white;
            font-size: 1rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
          }

          .status-box {
            margin-top: 25px;
            padding: 15px;
            border-radius: 8px;
            background: rgba(0,0,0,0.3);
            text-align: center;
            font-size: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
          }
        `}
      </style>

      {/* Animated light line */}
      <div className="glow-line" ref={lineRef}></div>

      {/* Page */}
      <div className="track-page">
        <div className="track-card" ref={cardRef}>
          <h2 ref={titleRef}>Track Shipment</h2>

          <div className="input-group" ref={inputRef}>
            <FaSearchLocation />
            <input
              placeholder="Enter Tracking ID"
              onChange={(e) => setId(e.target.value)}
            />
          </div>

          <button className="track-btn" ref={buttonRef} onClick={async () => {
            const res = await fetch(
              `http://localhost:5001/api/shipment/track/${id}`
            );
            const data = await res.json();
            setStatus(data?.status || "Not Found");
          }}>
            <FaTruck /> Track Package
          </button>

          {status && (
            <div className="status-box" ref={statusRef}>
              <FaBoxOpen /> Status: {status}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
