import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import SplashScreen from "./components/Common/SplashScreen";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import MainPage from "./components/Main/MainPage";

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
    navigate("/main");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const goToRegister = () => navigate("/register");
  const goToLogin = () => navigate("/login");

  if (showSplash) return <SplashScreen />;

  return (
    <Routes>
      {!isLoggedIn ? (
        <>
          <Route path="/login" element={<Login onLogin={handleLogin} goToRegister={goToRegister} />} />
          <Route path="/register" element={<Register onLogin={handleLogin} />} />
         <Route path="*" element={<Login onLogin={handleLogin} goToRegister={goToRegister} />} />

        </>
      ) : (
        <>
          <Route path="/main/*" element={<MainPage onLogout={handleLogout} />} />
          <Route path="*" element={<MainPage onLogout={handleLogout} />} />

        </>
      )}
    </Routes>
  );
};

export default App;