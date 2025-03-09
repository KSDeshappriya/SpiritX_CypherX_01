"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Head from 'next/head';

// Import Bootstrap CSS in your layout.js or page.js that loads this component
import 'bootstrap/dist/css/bootstrap.min.css';

// For client-side Bootstrap JS functionality (if needed)
// useEffect(() => {
//   require('bootstrap/dist/js/bootstrap.bundle.min.js');
// }, []);

export default function Dashboard() {
  interface User {
    username: string;
    // add other properties if needed
  }

  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        setUser(jwtDecode(token));
      } catch (error) {
        console.error("Invalid token:", error);
        router.push("/auth");
      }
    } else {
      router.push("/auth");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth");
  };

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <div className="container-fluid p-0">
        {/* Responsive Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
          <div className="container">
            <h1 className="navbar-brand fw-bold audiowideRegular">CypherX</h1>
            
            <div className="d-flex align-items-center">
              {user ? (
                <>
                  <span className="d-none d-sm-inline me-3">Welcome, {user.username}!</span>
                  <button 
                    onClick={handleLogout}
                    className="btn btn-danger rounded-pill px-4"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="spinner-border spinner-border-sm text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container py-5">
          <div className="row">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <h2 className="card-title fw-bold mb-4">Welcome to Your Dashboard</h2>
                  <p className="card-text">This is a protected page that would typically show after login.</p>
                  
                  <div className="alert alert-info mt-4">
                    <i className="bi bi-info-circle me-2"></i>
                    You are now logged in and can access all features of the application.
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <h4 className="card-title fw-bold mb-3">Quick Stats</h4>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Sessions</span>
                    <span className="badge bg-primary rounded-pill">24</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Projects</span>
                    <span className="badge bg-success rounded-pill">7</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Tasks</span>
                    <span className="badge bg-warning rounded-pill">12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-light py-4 mt-auto">
          <div className="container text-center">
            <p className="text-muted mb-0">© 2025 MyApp. All rights reserved.</p>
          </div>
        </footer>
      </div>
      <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Audiowide&display=swap');
      .audiowideRegular {
          font-family: "Audiowide", sans-serif;
          font-style: normal;
          font-weight: bold;
          font-size: 50px;
          color: black;
        }
      `}</style>
    </>
  );
}