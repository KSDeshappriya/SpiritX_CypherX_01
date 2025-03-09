"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import styles from "./page1.module.css";

export default function Home() {
  interface User {
    username: string;
    // add other properties if needed
  }

  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser(jwtDecode(token));
    else router.push("/auth");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth");
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.card}>
          <h1 className={styles.audiowideRegular}>CypherX</h1>
          {user ? (
            <div className={styles.userGreeting}>
              <h1 className={styles.greeting}>Hello, {user.username}!</h1>
              <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <p className={styles.loadingText}>Loading...</p>
          )}
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              <li>
                <button className={styles.navButton} onClick={() => router.push("/auth")}>
                  Login
                </button>
              </li>
              <li>
                <button className={styles.navButton} onClick={() => router.push("/auth")}>
                  Signup
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </main>
    </div>
  );
}
