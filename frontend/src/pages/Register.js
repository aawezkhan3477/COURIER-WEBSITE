import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FaUser, FaEnvelope, FaLock, FaUserShield } from "react-icons/fa";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const fieldRefs = useRef([]);
  const buttonRef = useRef(null);

  // 🔹 Submit registration
  const submit = async () => {
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");

        // Shake animation on error
        gsap.fromTo(
          cardRef.current,
          { x: -10 },
          { x: 10, duration: 0.1, repeat: 5, yoyo: true }
        );
        return;
      }

      // Success → redirect
      window.location.href = "/login";
    } catch (err) {
      setError("Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 GSAP page animation
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(cardRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 0.6,
    })
      .from(titleRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.5,
      })
      .from(
        fieldRefs.current,
        {
          y: 20,
          opacity: 0,
          stagger: 0.12,
          duration: 0.4,
        },
        "-=0.3"
      )
      .from(
        buttonRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.4,
        },
        "-=0.2"
      );
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

          .register-page {
            height: 100vh;
            background: linear-gradient(135deg, #141e30, #243b55);
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .register-card {
            background: #ffffff;
            padding: 40px;
            width: 380px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          }

          .register-card h2 {
            text-align: center;
            margin-bottom: 25px;
            color: #333;
          }

          .input-group {
            display: flex;
            align-items: center;
            background: #f2f2f2;
            border-radius: 6px;
            padding: 10px;
            margin-bottom: 15px;
          }

          .input-group input,
          .input-group select {
            border: none;
            background: transparent;
            outline: none;
            margin-left: 10px;
            width: 100%;
            font-size: 0.95rem;
          }

          .register-btn {
            width: 100%;
            padding: 12px;
            background: #1e88e5;
            border: none;
            color: white;
            font-size: 1rem;
            border-radius: 6px;
            cursor: pointer;
            margin-top: 10px;
          }

          .register-btn:disabled {
            background: #9ec3e8;
            cursor: not-allowed;
          }

          .register-btn:hover:not(:disabled) {
            background: #1565c0;
          }

          .error-text {
            color: red;
            margin-top: 12px;
            text-align: center;
            font-size: 0.9rem;
          }
        `}
      </style>

      {/* Page */}
      <div className="register-page">
        <div className="register-card" ref={cardRef}>
          <h2 ref={titleRef}>Register</h2>

          <div
            className="input-group"
            ref={(el) => (fieldRefs.current[0] = el)}
          >
            <FaUser color="#555" />
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

          <div
            className="input-group"
            ref={(el) => (fieldRefs.current[1] = el)}
          >
            <FaEnvelope color="#555" />
            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div
            className="input-group"
            ref={(el) => (fieldRefs.current[2] = el)}
          >
            <FaLock color="#555" />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          <div
            className="input-group"
            ref={(el) => (fieldRefs.current[3] = el)}
          >
            <FaUserShield color="#555" />
            <select
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            className="register-btn"
            ref={buttonRef}
            onClick={submit}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {error && <p className="error-text">{error}</p>}
        </div>
      </div>
    </>
  );
}
