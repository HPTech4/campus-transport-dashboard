import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { student } from "../data/student";
import { wallet } from "../data/wallet";
import { rides } from "../data/rides";
import styles from "../styles/App.module.css";

export default function Home() {
  const navigate = useNavigate();
  const recentRides = rides.slice(0, 5);

  // Calculate analytics
  const completedRides = rides.filter(ride => ride.status === "Completed");
  const totalSpent = completedRides.reduce((sum, ride) => sum + ride.fare, 0);
  const averageFare = completedRides.length > 0 ? Math.round(totalSpent / completedRides.length) : 0;
  const cancelledRides = rides.filter(ride => ride.status === "Cancelled");

  // Calculate ride status percentages
  const completedPercentage = Math.round((completedRides.length / rides.length) * 100);
  const cancelledPercentage = 100 - completedPercentage;

  // Calculate spending by date (group rides by date)
  const spendingByDate = rides.reduce((acc, ride) => {
    if (ride.status === "Completed") {
      if (!acc[ride.date]) {
        acc[ride.date] = 0;
      }
      acc[ride.date] += ride.fare;
    }
    return acc;
  }, {});

  // Get last 5 days for bar chart
  const barChartData = Object.entries(spendingByDate)
    .slice(0, 5)
    .map(([date, amount]) => ({ date, amount }));
  
  const maxAmount = Math.max(...barChartData.map(d => d.amount));

  return (
    <div className={styles.page}>
      <div className={styles.welcomeSection}>
        <div className={styles.walletCard}>
          <div className={styles.walletHeader}>
            <div>
              <p className={styles.greeting}>Hello, {student.name} 👋</p>
              <h3 className={styles.walletLabel}>Wallet Balance</h3>
            </div>
            <div className={styles.walletIcon}>💳</div>
          </div>
          <h1 className={styles.balance}>₦{wallet.balance.toLocaleString()}</h1>
          <div className={styles.actionButtons}>
            <button onClick={() => navigate("/topup")} className={styles.primaryButton}>
              <span className={styles.buttonIcon}>+</span>
              Top Up Wallet
            </button>
            <button onClick={() => navigate("/rides")} className={styles.secondaryButton}>
              <span className={styles.buttonIcon}>📋</span>
              View All Rides
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Analytics */}
      <div className={styles.analyticsSection}>
        <h2 className={styles.sectionTitle}>Dashboard Analytics</h2>
        <div className={styles.analyticsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>🚗</div>
            <div className={styles.statContent}>
              <p className={styles.statValue}>{rides.length}</p>
              <p className={styles.statLabel}>Total Rides</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>✔️</div>
            <div className={styles.statContent}>
              <p className={styles.statValue}>{completedRides.length}</p>
              <p className={styles.statLabel}>Completed</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>💰</div>
            <div className={styles.statContent}>
              <p className={styles.statValue}>₦{totalSpent.toLocaleString()}</p>
              <p className={styles.statLabel}>Total Spent</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📊</div>
            <div className={styles.statContent}>
              <p className={styles.statValue}>₦{averageFare}</p>
              <p className={styles.statLabel}>Avg. Fare</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className={styles.chartsSection}>
        <h2 className={styles.sectionTitle}>Statistics</h2>
        <div className={styles.chartsGrid}>
          {/* Pie Chart */}
          <div className={styles.chartCard}>
            <h3 className={styles.chartTitle}>Ride Status</h3>
            <div className={styles.chartContainer}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Completed", value: completedRides.length },
                      { name: "Cancelled", value: cancelledRides.length }
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    <Cell fill="#10b981" />
                    <Cell fill="#ef4444" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart */}
          <div className={styles.chartCard}>
            <h3 className={styles.chartTitle}>Spending by Date</h3>
            <div className={styles.chartContainer}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => `₦${value}`} />
                  <Bar dataKey="amount" fill="#4f46e5" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.recentSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recent Rides</h2>
          <button onClick={() => navigate("/rides")} className={styles.viewAllLink}>
            View All →
          </button>
        </div>
        
        <div className={styles.ridesGrid}>
          {recentRides.map((ride) => (
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
    </div>
  );
}
