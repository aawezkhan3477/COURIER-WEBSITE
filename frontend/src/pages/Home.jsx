import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Home() {
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(titleRef.current, {
      y: -40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .from(
        textRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .from(
        buttonRef.current,
        {
          scale: 0.8,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      );
  }, []);

  return (
    <>
      {/* Styles */}
      <style>
        {`
          .home-container {
            height: 80vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            background: linear-gradient(135deg, #1e3c72, #2a5298);
            color: white;
            font-family: Arial, sans-serif;
          }

          .home-container h2 {
            font-size: 2.8rem;
            margin-bottom: 12px;
          }

          .home-container p {
            font-size: 1.2rem;
            max-width: 520px;
            margin-bottom: 25px;
          }

          .home-container button {
            padding: 12px 28px;
            font-size: 1rem;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            background: #ff9800;
            color: #000;
            transition: transform 0.2s ease;
          }

          .home-container button:hover {
            transform: scale(1.05);
          }
        `}
      </style>

      {/* Page */}
      <div className="home-container">
        <h2 ref={titleRef}>Welcome to Courier Service</h2>
        <p ref={textRef}>
          Fast, reliable, and secure deliveries you can trust.
        </p>
        <button ref={buttonRef}>Track Your Package</button>
      </div>
    </>
  );
}
