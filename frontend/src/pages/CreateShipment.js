import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { getToken } from "../utils/auth";
import { FaBox, FaUser, FaTruck } from "react-icons/fa";

export default function CreateShipment() {
  const [form, setForm] = useState({
    trackingId: "",
    sender: "",
    receiver: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const cardRef = useRef(null);
  const fieldRefs = useRef([]);
  const buttonRef = useRef(null);

  // 🔹 GSAP entry animation
  useEffect(() => {
    gsap.from(cardRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.6,
      ease: "power3.out",
    });

    gsap.from(fieldRefs.current, {
      y: 20,
      opacity: 0,
      stagger: 0.15,
      duration: 0.4,
      ease: "power2.out",
      delay: 0.3,
    });
  }, []);

  // 🔹 Submit shipment
  const submit = async () => {
    if (loading) return;

    setError("");
    setSuccess("");

    // Basic validation
    if (!form.trackingId || !form.sender || !form.receiver) {
      setError("All fields are required");

      gsap.fromTo(
        cardRef.current,
        { x: -10 },
        { x: 10, repeat: 5, yoyo: true, duration: 0.08 }
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:5001/api/shipment/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to create shipment");
        return;
      }

      setSuccess("Shipment created successfully");

      // Button success animation
      gsap.fromTo(
        buttonRef.current,
        { scale: 1 },
        { scale: 1.05, yoyo: true, repeat: 1, duration: 0.2 }
      );

      // Reset form
      setForm({
        trackingId: "",
        sender: "",
        receiver: "",
      });
    } catch {
      setError("Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Styles */}
      <style>
        {`
          body {
            margin: 0;
            font-family: Arial, sans-serif;
          }

          .create-page {
            height: 100vh;
            background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .create-card {
            background: white;
            padding: 40px;
            width: 400px;
            border-radius: 12px;
            box-shadow: 0 15px 40px rgba(0,0,0,0.25);
          }

          .create-card h2 {
            text-align: center;
            margin-bottom: 25px;
          }

          .input-group {
            display: flex;
            align-items: center;
            background: #f2f2f2;
            border-radius: 6px;
            padding: 10px;
            margin-bottom: 15px;
          }

          .input-group input {
            border: none;
            background: transparent;
            outline: none;
            margin-left: 10px;
            width: 100%;
          }

          .create-btn {
            width: 100%;
            padding: 12px;
            border: none;
            border-radius: 6px;
            background: linear-gradient(135deg, #00c6ff, #0072ff);
            color: white;
            font-size: 1rem;
            cursor: pointer;
            margin-top: 10px;
          }

          .create-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }

          .error {
            color: red;
            text-align: center;
            margin-top: 10px;
          }

          .success {
            color: green;
            text-align: center;
            margin-top: 10px;
          }
        `}
      </style>

      {/* Page */}
      <div className="create-page">
        <div className="create-card" ref={cardRef}>
          <h2>Create Shipment</h2>

          <div
            className="input-group"
            ref={(el) => (fieldRefs.current[0] = el)}
          >
            <FaBox />
            <input
              placeholder="Tracking ID"
              value={form.trackingId}
              onChange={(e) =>
                setForm({ ...form, trackingId: e.target.value })
              }
            />
          </div>

          <div
            className="input-group"
            ref={(el) => (fieldRefs.current[1] = el)}
          >
            <FaUser />
            <input
              placeholder="Sender"
              value={form.sender}
              onChange={(e) =>
                setForm({ ...form, sender: e.target.value })
              }
            />
          </div>

          <div
            className="input-group"
            ref={(el) => (fieldRefs.current[2] = el)}
          >
            <FaTruck />
            <input
              placeholder="Receiver"
              value={form.receiver}
              onChange={(e) =>
                setForm({ ...form, receiver: e.target.value })
              }
            />
          </div>

          <button
            className="create-btn"
            ref={buttonRef}
            onClick={submit}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Shipment"}
          </button>

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </div>
      </div>
    </>
  );
}
