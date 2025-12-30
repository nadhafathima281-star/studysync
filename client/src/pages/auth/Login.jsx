import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { FiMail, FiLock } from "react-icons/fi";
import AppIcon from "../../assets/studysync-icon.svg";
import "./auth.css";
import ThemeToggle from "../../components/common/ThemeToggle";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await login(form);
      toast.success(res.data?.message || "OTP required");
      navigate("/verify-otp", { state: { email: form.email } });
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Login failed. Try again."
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
      <form className="auth-card" onSubmit={handleSubmit} noValidate>
        <div className="auth-icon">
          <img src={AppIcon} alt="StudySync logo" />
        </div>

        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-subtitle">
          Continue your learning journey with StudySync
        </p>

        <div className="form-group">
          <div className="input-wrapper">
            <span className="input-icon"><FiMail /></span>
            <input
              className={`auth-input ${errors.email ? "error" : ""}`}
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          {errors.email && <span className="input-error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <div className="input-wrapper">
            <span className="input-icon"><FiLock /></span>
            <input
              className={`auth-input ${errors.password ? "error" : ""}`}
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          {errors.password && (
            <span className="input-error">{errors.password}</span>
          )}
        </div>

        <div className="auth-row">
          <Link to="/forgot-password">Forgot password?</Link>
        </div>

        <button className="auth-btn" disabled={loading}>
          {loading ? "Submitting..." : "Login"}
        </button>

        <p className="auth-footer">
          Don’t have an account?{" "}
          <Link to="/register" className="auth-link">Register</Link>
        </p>
      </form>
    </div>
  );
}