import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { student } from "../data/student";
import styles from "../styles/App.module.css";

const navLinkClass = ({ isActive }) =>
  isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink;

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={styles.appShell}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button 
            className={styles.hamburger} 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle menu"
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>
          <div className={styles.brand}>Campus Transport</div>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.emailIcon}>📧</div>
          <div className={styles.notificationContainer}>
            <button className={styles.notificationIcon}>🔔</button>
            <span className={styles.notificationBadge}>3</span>
          </div>
        </div>
      </header>

      <div className={styles.layoutContainer}>
        {sidebarOpen && <div className={styles.overlay} onClick={() => setSidebarOpen(false)}></div>}
        <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
          <nav className={styles.sideNav}>
            <NavLink to="/" className={navLinkClass} end onClick={() => setSidebarOpen(false)}>
              <span className={styles.navIcon}>🏠</span>
              Home
            </NavLink>
            <NavLink to="/topup" className={navLinkClass} onClick={() => setSidebarOpen(false)}>
              <span className={styles.navIcon}>💼</span>
              Top Up
            </NavLink>
            <NavLink to="/rides" className={navLinkClass} onClick={() => setSidebarOpen(false)}>
              <span className={styles.navIcon}>🚗</span>
              Rides
            </NavLink>
          </nav>

          <div className={styles.sidebarProfile}>
            <div className={styles.profileAvatar}>{student.name.charAt(0)}</div>
            <div className={styles.profileInfo}>
              <p className={styles.profileName}>{student.name}</p>
              <p className={styles.profileStatus}>Student</p>
            </div>
          </div>
        </aside>

        <main className={styles.content}>
          <Outlet />
        </main>
      </div>

      <footer className={styles.footer}>
        <span>Campus Transport Dashboard</span>
        <span>Mock data only</span>
      </footer>
    </div>
  );
}
