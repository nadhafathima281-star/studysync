import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import AppIcon from "../../assets/studysync-icon.svg";
import "./auth.css";
import ThemeToggle from "../../components/common/ThemeToggle";

export default function VerifyOtp() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);

  const inputsRef = useRef([]);
  const { verifyOTP } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  // safety check
  useEffect(() => {
    if (!email) navigate("/login");
  }, [email, navigate]);

  // handle input change
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  // handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalOtp = otp.join("");
    if (finalOtp.length < 6) {
      toast.error("Enter complete OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await verifyOTP({ email, otp: finalOtp });
      toast.success(res.data?.message || "Login successful");
      navigate("/");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Invalid OTP. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
       <div className="auth-theme-toggle">
              <ThemeToggle/>
            </div>
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-icon">
          <img src={AppIcon} alt="StudySync logo" />
        </div>

        <h2 className="auth-title">Verify OTP</h2>
        <p className="auth-subtitle">
          Enter the code sent to <strong>{email}</strong>
        </p>

        {/* OTP BOXES */}
        <div className="otp-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              className="otp-input"
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>

        <button className="auth-btn" disabled={loading}>
          {loading ? "Verifying..." : "Verify & Continue"}
        </button>

        <p className="auth-footer">
          <Link to="/login" className="auth-link">
            Go back to Login
          </Link>
        </p>
      </form>
    </div>
  );
}