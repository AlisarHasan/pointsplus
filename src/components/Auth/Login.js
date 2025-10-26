import React, { useState } from "react";
import "../../styles/login.css";

const Login = ({ onLogin, goToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();

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

    // جلب الحسابات
    const accountsStr = localStorage.getItem("accounts");
    if (!accountsStr) {
      setError("There is no account with this email, please register first.");
      return;
    }

    const accounts = JSON.parse(accountsStr);
    const account = accounts.find(acc => acc.email === email);

    if (!account) {
      setError("There is no account with this email, please register first.");
      return;
    }

    if (account.password !== password) {
      setError("The password is incorrect");
      return;
    }

    localStorage.setItem("username", account.username);
    localStorage.setItem("email", account.email);
    const now = new Date();
const history = JSON.parse(localStorage.getItem("loginHistory")) || [];
history.push({
  date: now.toLocaleString(),
  device: navigator.userAgent,
});
localStorage.setItem("loginHistory", JSON.stringify(history));

    onLogin();
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="form-section">
        {error && <div className="error-message">{error}</div>}

        <input
          type="email"
          placeholder="your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      <p>
        Don't you have an account?{" "}
        <button className="link-button" onClick={goToRegister}>
        Create a new account        
        </button>
      </p>
      </div>
            </form>
    </div>
  );
};

export default Login;