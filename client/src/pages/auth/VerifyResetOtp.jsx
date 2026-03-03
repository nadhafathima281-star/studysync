import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import AppIcon from "../../assets/studysync-icon.svg";
import ThemeToggle from "../../components/common/ThemeToggle";
import "./auth.css";

export default function VerifyResetOtp() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);

  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyResetOtp } = useAuth();

  const phone = location.state?.phone;

  // Redirect if phone missing
  useEffect(() => {
    if (!phone) {
      navigate("/forgot-password");
    }
  }, [phone, navigate]);

  // Autofocus first box
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  // Mask phone number
  const maskPhone = (phone) => {
    if (!phone) return "";
    const country = phone.slice(0, 3); // +91
    const last4 = phone.slice(-4);
    return `${country}******${last4}`;
  };

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      toast.error("Enter complete OTP");
      return;
    }

    setLoading(true);

    try {
      const res = await verifyResetOtp({
        phone,
        otp: finalOtp,
      });

      toast.success(res.data?.message || "OTP verified");
      navigate("/reset-password", { state: { phone } });

    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Invalid or expired OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-theme-toggle">
        <ThemeToggle />
      </div>

      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-icon">
          <img src={AppIcon} alt="StudySync logo" />
        </div>

        <h2 className="auth-title">Verify Reset OTP</h2>
        <p className="auth-subtitle">
          Enter the OTP sent to <strong>{maskPhone(phone)}</strong>
        </p>

        <div className="otp-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              inputMode="numeric"
              autoComplete="one-time-code"
              className="otp-input"
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>

        <button className="auth-btn" disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <p className="auth-footer" style={{ marginTop: "14px" }}>
          OTP is valid for 10 minutes.
        </p>

        <p className="auth-footer">
          <Link to="/forgot-password" className="auth-link">
            Go back
          </Link>
        </p>
      </form>
    </div>
  );
}