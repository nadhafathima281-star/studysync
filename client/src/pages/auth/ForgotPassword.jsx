import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { FiPhone } from "react-icons/fi";
import AppIcon from "../../assets/studysync-icon.svg";
import ThemeToggle from "../../components/common/ThemeToggle";
import "./auth.css";

export default function ForgotPassword() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { forgot } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    if (!phone.trim()) {
      setError("Phone number is required");
      return false;
    }

    if (!/^\+91\d{10}$/.test(phone)) {
      setError("Use +91XXXXXXXXXX format");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if (!validate()) return;


    setLoading(true);
    try {
      const res = await forgot({ phone });
      toast.success(res.data?.message || "OTP sent to your phone");
      navigate("/verify-reset-otp", { state: { phone } });
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to send OTP"
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

        <h2 className="auth-title">Forgot Password</h2>
        <p className="auth-subtitle">
          Enter your registered phone number
        </p>

        <div className="form-group">
          <div className="input-wrapper">
            <span className="input-icon"><FiPhone /></span>
            <input
              type="tel"
              placeholder="Phone (+91XXXXXXXXXX)"
              className={`auth-input ${error ? "error" : ""}`}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          {error && <span className="input-error">{error}</span>}
        </div>

        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? "Sending OTP..." : "Send Reset OTP"}
        </button>

        <p className="auth-footer">
          <Link to="/login" className="auth-link">
            Back to Login
          </Link>
        </p>
      </form>
    </div>
  );
} 