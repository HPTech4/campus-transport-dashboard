import { rides } from "../data/rides";
import styles from "../styles/App.module.css";

export default function RideHistory() {
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Ride History</h1>
        <p className={styles.pageSubtitle}>All your campus transportation records</p>
      </div>

      <div className={styles.ridesGrid}>
        {rides.map((ride) => (
          <div key={ride.id} className={styles.rideCard}>
            <div className={styles.rideHeader}>
              <span className={styles.rideDate}>{ride.date}</span>
              <span className={`${styles.rideStatus} ${ride.status === "Completed" ? styles.statusCompleted : styles.statusCancelled}`}>
                {ride.status}
              </span>
            </div>
            <div className={styles.rideRoute}>
              <span className={styles.routeText}>{ride.route}</span>
            </div>
            <div className={styles.rideFare}>
              <span className={styles.fareLabel}>Fare:</span>
              <span className={styles.fareAmount}>₦{ride.fare}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
