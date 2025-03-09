'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function AuthPage() {
  // State variables for error messages
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [error, setError] = useState("");

  // Function to validate username
  const validateUsername = (name) => {
    if (name.length < 4) {
      setUsernameError("⚠ Username must be at least 4 characters long.");
    } else {
      setUsernameError(""); 
    }
  };

  // Function to validate password
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError("⚠ Password must have uppercase, lowercase, and special character.");
    } else {
      setPasswordError(""); 
    }
  };

  // Function to validate confirm password
  const validateConfirmPassword = (password, confirmPassword) => {
    if (confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError("⚠ Passwords do not match!");
    } else {
      setConfirmPasswordError(""); 
    }
  };

  // State variable to toggle between sign-in and sign-up panels
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const router = useRouter();

  // Function to toggle the panel
  const togglePanel = () => {
    setIsRightPanelActive(!isRightPanelActive);
  };

  // Function to handle sign-up form submission
  const handleSignUp = async (e) => {
    e.preventDefault();

    const username = e.target.name.value.trim();
    const password = e.target.password.value;
    const confirmPassword = e.target['C-password'].value;

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, confirmPassword }),
    });

    const data = await res.json();
    if (!res.ok) return setError(data.error);

    alert("Signup successful! Redirecting to login...");
    router.push("/login");
  };

  // Function to handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;
    const rememberMe = e.target.rememberMe?.checked || false;

    // Send login request to the server
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, rememberMe }),  
    });

    const data = await res.json();
    if (!res.ok) return setError(data.error);

    localStorage.setItem("token", data.token);
    alert("Login successful!");
    router.push("/dashboard");  
  };

  // JSX to render the authentication page
  return (
    <>
      <Head>
        <title>Login & Sign Up</title>
        <meta name="description" content="Login and sign up page" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
      </Head>

      <div className="auth-page">
        <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`}>
          {/* signup */}
          <div className="form-container sign-up-container">
            <form onSubmit={handleSignUp}>
              <h1>Create Account</h1>

              <div className="infield">
                <input
                  type="text"
                  name="name"
                  placeholder="Username"
                  onBlur={(e) => validateUsername(e.target.value)} 
                  className={usernameError ? 'error-input' : ''}
                  required
                />
                {usernameError && <p className="error">{usernameError}</p>}
              </div>

              <div className="infield">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onBlur={(e) => validatePassword(e.target.value)} 
                  className={passwordError ? 'error-input' : ''}
                  required
                />
                {passwordError && <p className="error">{passwordError}</p>}
              </div>

              <div className="infield">
                <input
                  type="password"
                  name="C-password"
                  placeholder="Confirm Password"
                  onBlur={(e) => validateConfirmPassword(document.querySelector("input[name='password']").value, e.target.value)}
                  className={confirmPasswordError ? 'error-input' : ''}
                  required
                />
                {confirmPasswordError && <p className="error">{confirmPasswordError}</p>}
              </div>

              <button type="submit">Sign Up</button>
              <div className="mobile-panel-switch">
                <span>Already have an account?</span>
                <button className="switch-button" type="button" onClick={togglePanel}>Sign In</button>
              </div>
            </form>
          </div>

          {/* login */}
          <div className="form-container sign-in-container">
            <form onSubmit={handleLogin}>
              <h1>Sign In</h1>
              <div className="social-container">
                <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
              </div>
              <span>or use your account</span>
              <div className="infield">
                <input type="username" name="username" placeholder="Username" onBlur={(e) => validateUsername(e.target.value)} required />
              </div>
              <div className="infield">
                <input type="password" name="password" placeholder="Password" onBlur={(e) => validatePassword(e.target.value)} required />
              </div>
              <div className="remember-me">
                <input type="checkbox" id="rememberMe" name="rememberMe" />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              {error && <p className="error">{error}</p>}
              <a href="#" className="forgot">Forgot your password?</a>
              <button type="submit">Sign In</button>
              <div className="mobile-panel-switch">
                <span>Don't have an account?</span>
                <button className="switch-button" type="button" onClick={togglePanel}>Sign Up</button>
              </div>
            </form>
          </div>

          {/* overlay */}
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>To keep connected with us please login with your personal info</p>
                <button className="ghost" onClick={togglePanel}>Sign In</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button className="ghost" onClick={togglePanel}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* Global styles for the authentication page */
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: 'Montserrat', sans-serif;
        }
        
        .auth-page {
          background: linear-gradient(to right, rgb(255, 255, 255), #f4f4f4);
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          font-family: 'Montserrat', sans-serif;
          height: 100vh;
          width: 100%;
        }
        
        h1 {
          font-weight: bold;
          margin: 0;
          margin-bottom: 15px;
          font-size: 1.8rem;
        }
        
        p {
          font-size: 14px;
          font-weight: 100;
          line-height: 20px;
          letter-spacing: 0.5px;
          margin: 20px 0 30px;
        }
        
        span {
          font-size: 12px;
        }
        
        a {
          color: #333;
          font-size: 14px;
          text-decoration: none;
          margin: 15px 0;
        }
        
        button {
          border-radius: 20px;
          border: 1px solid rgb(40, 42, 146);
          background-color: rgb(40, 42, 146);
          color: #ffffff;
          font-size: 12px;
          font-weight: bold;
          padding: 12px 45px;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: transform 80ms ease-in;
          cursor: pointer;
          margin-top: 10px;
        }
        
        button:active {
          transform: scale(0.95);
        }
        
        button:focus {
          outline: none;
        }
        
        button.ghost {
          background-color: transparent;
          border-color: #ffffff;
        }
        
        form {
          background-color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 0 50px;
          height: 100%;
          text-align: center;
        }
        
        .container {
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
          position: relative;
          overflow: hidden;
          width: 768px;
          max-width: 100%;
          min-height: 500px;
        }
        
        .social-container a {
          border: 1px solid #dddddd;
          border-radius: 50%;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          margin: 0 5px;
          height: 40px;
          width: 40px;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .social-container a:hover {
          background-color: rgb(40, 42, 146);
          color: white;
          border-color: rgb(40, 42, 146);
        }
        
        .form-container {
          position: absolute;
          top: 0;
          height: 100%;
          transition: all 0.6s ease-in-out;
        }
        
        .sign-in-container {
          left: 0;
          width: 50%;
          z-index: 2;
        }

        .sign-in-container h1 {
          margin-top: 5px;
        }
        
        .container.right-panel-active .sign-in-container {
          transform: translateX(100%);
        }
        
        .sign-up-container {
          left: 0;
          width: 50%;
          opacity: 0;
          z-index: 1;
        }
        
        .container.right-panel-active .sign-up-container {
          transform: translateX(100%);
          opacity: 1;
          z-index: 5;
          animation: show 0.6s;
        }
        
        @keyframes show {
          0%, 49.99% {
            opacity: 0;
            z-index: 1;
          }
          
          50%, 100% {
            opacity: 1;
            z-index: 5;
          }
        }
        
        .overlay-container {
          position: absolute;
          top: 0;
          left: 50%;
          width: 50%;
          height: 100%;
          overflow: hidden;
          transition: transform 0.6s ease-in-out;
          z-index: 100;
        }
        
        .container.right-panel-active .overlay-container{
          transform: translateX(-100%);
        }
        
        .overlay {
          background: #03045E;
          background: linear-gradient(to bottom, #03045E, #0077B6);
          background-repeat: no-repeat;
          background-size: cover;
          background-position: 0 0;
          color: #ffffff;
          position: relative;
          left: -100%;
          height: 100%;
          width: 200%;
          transform: translateX(0);
          transition: transform 0.6s ease-in-out;
        }
        
        .container.right-panel-active .overlay {
          transform: translateX(50%);
        }
        
        .overlay-panel {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 0 40px;
          text-align: center;
          top: 0;
          height: 100%;
          width: 50%;
          transform: translateX(0);
          transition: transform 0.6s ease-in-out;
        }
        
        .overlay-left {
          transform: translateX(-20%);
        }
        
        .container.right-panel-active .overlay-left {
          transform: translateX(0);
        }
        
        .overlay-right {
          right: 0;
          transform: translateX(0);
        }
        
        .container.right-panel-active .overlay-right {
          transform: translateX(20%);
        }
        
        .social-container {
          margin: 10px 0;
        }
        
        .social-container a {
          border: 1px solid #dddddd;
          border-radius: 50%;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          margin: 0 5px;
          height: 40px;
          width: 40px;
        }
        
        .infield {
          position: relative;
          margin: 8px 0;
          width: 100%;
          max-width: 250px;
        }
        
        input {
          background-color: #eee;
          border: none;
          padding: 12px 15px;
          margin: 2px 0;
          width: 100%;
          border-radius: 5px;
        }
        
        .remember-me {
          display: flex;
          align-items: center;
          margin-top: 10px;
        }
        
        .remember-me input {
          width: auto;
          margin-right: 10px;
        }
        
        .forgot {
          color: #333;
          font-size: 14px;
          text-decoration: none;
        }

        .error {
          color: red;
          font-size: 12px;
          margin-top: 5px;
          margin-bottom: 0px;
        }

        .error-input {
          border: 2px solid red;
        }
        
        .mobile-panel-switch {
          display: none;
          flex-direction: column;
          margin-top: 20px;
          text-align: center;
          width: 100%;
        }
        
        .switch-button {
          background: none;
          border: none;
          color: rgb(40, 42, 146);
          cursor: pointer;
          font-weight: bold;
          margin: 10px 0;
          padding: 5px;
          text-transform: none;
        }
        
        /* Mobile responsive styles */
        @media (max-width: 768px) {
          .container {
            width: 95%;
            min-height: 480px;
            margin: 20px auto;
          }
          
          form {
            padding: 0 20px;
          }
          
          h1 {
            font-size: 1.5rem;
          }
          
          button {
            padding: 10px 30px;
          }
        }
        
        @media (max-width: 550px) {
          .overlay-container {
            display: none;
          }
          
          .sign-in-container, .sign-up-container {
            width: 100%;
          }
          
          .container.right-panel-active .sign-in-container {
            transform: translateX(-100%);
          }
          
          .container.right-panel-active .sign-up-container {
            transform: translateX(0);
          }
          
          .mobile-panel-switch {
            display: flex;
            border-top: 1px solid #eee;
            padding-top: 15px;
          }
          
          form {
            padding: 20px;
          }
          
          .infield {
            max-width: 100%;
          }
        }
        
        @media (max-width: 480px) {
          .container {
            min-height: 550px;
          }
          
          form {
            padding: 10px;
          }
          
          h1 {
            font-size: 1.2rem;
          }
          
          .social-container a {
            height: 35px;
            width: 35px;
          }
          
          input {
            padding: 10px;
          }
          
          button {
            padding: 8px 20px;
            font-size: 11px;
          }
        }
      `}</style>
    </>
  );
}