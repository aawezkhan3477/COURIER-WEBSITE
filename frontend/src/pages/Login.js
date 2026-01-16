import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FaGoogle, FaGithub, FaLock, FaEnvelope } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const inputRefs = useRef([]);
  const buttonRef = useRef(null);
  const oauthRef = useRef(null);

  const login = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      window.location.href = "/";
    } catch (err) {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

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
        inputRefs.current,
        {
          y: 20,
          opacity: 0,
          stagger: 0.15,
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
      )
      .from(
        oauthRef.current,
        {
          opacity: 0,
          y: 20,
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

          .login-page {
            height: 100vh;
            background: linear-gradient(135deg, #141e30, #243b55);
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .login-card {
            background: #ffffff;
            padding: 40px;
            width: 360px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          }

          .login-card h2 {
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

          .input-group input {
            border: none;
            background: transparent;
            outline: none;
            margin-left: 10px;
            width: 100%;
            font-size: 0.95rem;
          }

          .login-btn {
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

          .login-btn:disabled {
            background: #9ec3e8;
            cursor: not-allowed;
          }

          .login-btn:hover:not(:disabled) {
            background: #1565c0;
          }

          .divider {
            text-align: center;
            margin: 20px 0;
            color: #999;
            font-size: 0.9rem;
          }

          .oauth-buttons {
            display: flex;
            gap: 10px;
          }

          .oauth-btn {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 10px;
            border-radius: 6px;
            border: none;
            cursor: pointer;
            font-size: 0.9rem;
          }

          .google {
            background: #db4437;
            color: white;
          }

          .github {
            background: #24292e;
            color: white;
          }
        `}
      </style>

      {/* Page */}
      <div className="login-page">
        <div className="login-card" ref={cardRef}>
          <h2 ref={titleRef}>Login</h2>

          <div
            className="input-group"
            ref={(el) => (inputRefs.current[0] = el)}
          >
            <FaEnvelope color="#555" />
            <input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div
            className="input-group"
            ref={(el) => (inputRefs.current[1] = el)}
          >
            <FaLock color="#555" />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="login-btn"
            ref={buttonRef}
            onClick={login}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="divider">OR</div>

          <div className="oauth-buttons" ref={oauthRef}>
            <button className="oauth-btn google">
              <FaGoogle /> Google
            </button>
            <button className="oauth-btn github">
              <FaGithub /> GitHub
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
