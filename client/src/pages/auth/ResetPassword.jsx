import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import AppIcon from "../../assets/studysync-icon.svg";
import ThemeToggle from "../../components/common/ThemeToggle";
import "./auth.css";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { reset } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const phone = location.state?.phone;

  // redirect if phone missing
  useEffect(() => {
    if (!phone) {
      navigate("/forgot-password");
    }
  }, [phone, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if(newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await reset({
        phone,
        newPassword,
      });

      toast.success(res.data?.message || "Password reset successful");

      navigate("/login");

    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Reset failed"
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

        <h2 className="auth-title">Reset Password</h2>
        <p className="auth-subtitle">
          Create a new password for your account
        </p>

        <div className="form-group">
  <div className="input-wrapper">
    <span className="input-icon"><FiLock /></span>

    <input
      type={showNewPassword ? "text" : "password"}
      placeholder="New password"
      className="auth-input"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
    />

    <span
      className="toggle-password"
      onClick={() => setShowNewPassword(!showNewPassword)}
    >
      {showNewPassword ? <FiEyeOff /> : <FiEye />}
    </span>
  </div>
</div>

        <div className="form-group">
  <div className="input-wrapper">
    <span className="input-icon"><FiLock /></span>

    <input
      type={showConfirmPassword ? "text" : "password"}
      placeholder="Confirm password"
      className="auth-input"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
    />

    <span
      className="toggle-password"
      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    >
      {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
    </span>
  </div>
</div>

        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
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