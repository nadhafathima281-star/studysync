import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { FiUser, FiMail, FiPhone, FiLock } from "react-icons/fi";
import AppIcon from "../../assets/studysync-icon.svg";
import "./auth.css";
import ThemeToggle from "../../components/common/ThemeToggle";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Full name is required";

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+91\d{10}$/.test(form.phone)) {
      newErrors.phone = "Use +91XXXXXXXXXX format";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Minimum 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await register(form);
      toast.success(
        res.data?.message ||
          "Registration successful. Please verify your email."
      );
      navigate("/login");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Registration failed. Try again."
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

        <h2 className="auth-title">Create account</h2>
        <p className="auth-subtitle">
          Start your learning journey with StudySync
        </p>

        <div className="form-group">
          <div className="input-wrapper">
            <span className="input-icon"><FiUser /></span>
            <input
              className={`auth-input ${errors.name ? "error" : ""}`}
              type="text"
              name="name"
              placeholder="Full name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          {errors.name && <span className="input-error">{errors.name}</span>}
        </div>

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
            <span className="input-icon"><FiPhone /></span>
            <input
              className={`auth-input ${errors.phone ? "error" : ""}`}
              type="tel"
              name="phone"
              placeholder="Phone (+91XXXXXXXXXX)"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          {errors.phone && <span className="input-error">{errors.phone}</span>}
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

        <button className="auth-btn" disabled={loading}>
          {loading ? "Registering..." : "Create account"}
        </button>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">Login</Link>
        </p>
      </form>
    </div>
  );
}