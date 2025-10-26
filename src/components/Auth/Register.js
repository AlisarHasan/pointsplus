import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";

const Register = ({ goToLogin, onLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.trim() === "") {
      setError("Please Enter Your UserName");
      return;
    }
    if (email.trim() === "") { 
      setError("Please Enter Your Email");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please Enter A valid Email");
      return;
    }
    if (password.trim() === "") {
      setError("Please Enter Your Password");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 charecters");
      return;
    }

    const accountsStr = localStorage.getItem("accounts");
    const accounts = accountsStr ? JSON.parse(accountsStr) : [];

    // التحقق من وجود البريد مسبقاً
    if (accounts.find(acc => acc.email === email)) {
      setError("The account is already in use, please log in");
      return;
    }

    // إضافة حساب جديد
    const newAccount = { username, email, password };
    accounts.push(newAccount);
    localStorage.setItem("accounts", JSON.stringify(accounts));
    // تسجيل أول دخول للمستخدم الجديد
const now = new Date();
const history = JSON.parse(localStorage.getItem("loginHistory")) || [];
history.push({
  date: now.toLocaleString(),
  device: navigator.userAgent,
});
localStorage.setItem("loginHistory", JSON.stringify(history));


    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("isLoggedIn", "true");

    setError("");
    setSuccess("The account has been created and you are now logged in.");

    if (typeof onLogin === "function") {
      onLogin(); 
      navigate("/main");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">create an account</button>

          <p>
            have an account?{" "}
            <button
              type="button"
              className="link-button"
              onClick={goToLogin}
            >
              login
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
