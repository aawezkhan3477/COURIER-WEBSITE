import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { getToken } from "../utils/auth";

const STATUS_FLOW = [
  "Pending",
  "In Transit",
  "Out for Delivery",
  "Delivered",
];

export default function AdminDashboard() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const lineRefs = useRef([]);

  // 🔹 Load shipments
  const loadShipments = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5001/api/shipment/all", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!res.ok) throw new Error("Failed to load shipments");

      setShipments(await res.json());
    } catch (err) {
      setError("Unable to load shipments");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Update shipment status
  const updateStatus = async (id, status) => {
    try {
      await fetch(
        `http://localhost:5001/api/shipment/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      setShipments((prev) =>
        prev.map((s) =>
          s._id === id ? { ...s, status } : s
        )
      );
    } catch {
      alert("Failed to update status");
    }
  };

  // 🔹 GSAP blinking logistics line
  useEffect(() => {
    gsap.to(lineRefs.current, {
      backgroundPositionX: "200%",
      duration: 2,
      repeat: -1,
      ease: "linear",
    });
  }, [shipments]);

  useEffect(() => {
    loadShipments();
  }, []);

  return (
    <>
      <style>
        {`
          .admin-container {
            padding: 30px;
            font-family: Arial, sans-serif;
          }

          .shipment-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 20px;
          }

          .shipment-card {
            background: white;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 4px 14px rgba(0,0,0,0.12);
          }

          .tracking-id {
            font-weight: bold;
            font-size: 1.05rem;
          }

          .route {
            margin: 6px 0;
            color: #555;
          }

          .status-line {
            height: 3px;
            margin: 12px 0;
            background: linear-gradient(
              90deg,
              transparent,
              #00c6ff,
              transparent
            );
            background-size: 200% 100%;
          }

          .status-steps {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
          }

          .step {
            font-size: 0.75rem;
            text-align: center;
            flex: 1;
            opacity: 0.3;
          }

          .step.active {
            color: #1e88e5;
            font-weight: bold;
            opacity: 1;
          }

          select {
            margin-top: 12px;
            width: 100%;
            padding: 8px;
          }

          .loading,
          .error {
            text-align: center;
            margin-top: 40px;
          }

          .error {
            color: red;
          }
        `}
      </style>

      <div className="admin-container">
        <h2>Admin Dashboard</h2>

        {loading && <p className="loading">Loading shipments...</p>}
        {error && <p className="error">{error}</p>}

        <div className="shipment-grid">
          {shipments.map((s, index) => {
            const currentIndex = STATUS_FLOW.indexOf(s.status);

            return (
              <div key={s._id} className="shipment-card">
                <div className="tracking-id">
                  {s.trackingId}
                </div>

                <div className="route">
                  {s.sender} → {s.receiver}
                </div>

                {/* GSAP animated line */}
                <div
                  className="status-line"
                  ref={(el) => (lineRefs.current[index] = el)}
                />

                {/* Status steps */}
                <div className="status-steps">
                  {STATUS_FLOW.map((step, i) => (
                    <div
                      key={step}
                      className={`step ${
                        i <= currentIndex ? "active" : ""
                      }`}
                    >
                      {step}
                    </div>
                  ))}
                </div>

                {/* Status update */}
                <select
                  value={s.status}
                  onChange={(e) =>
                    updateStatus(s._id, e.target.value)
                  }
                >
                  {STATUS_FLOW.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
