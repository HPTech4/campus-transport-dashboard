import { useState } from "react";
import styles from "../styles/App.module.css";

export default function TopUp() {
  const [amount, setAmount] = useState("");
  const [showAccount, setShowAccount] = useState(false);

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Top Up Wallet</h1>
        <p className={styles.pageSubtitle}>Add funds to your campus transport wallet</p>
      </div>

      <div className={styles.topUpContainer}>
        <div className={styles.topUpCard}>
          <label className={styles.inputLabel}>Enter Amount (₦)</label>
          <input
            type="number"
            placeholder="e.g., 5000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={styles.amountInput}
          />

          <div className={styles.quickAmounts}>
            <button onClick={() => setAmount("1000")} className={styles.quickAmountBtn}>₦1,000</button>
            <button onClick={() => setAmount("2000")} className={styles.quickAmountBtn}>₦2,000</button>
            <button onClick={() => setAmount("5000")} className={styles.quickAmountBtn}>₦5,000</button>
            <button onClick={() => setAmount("10000")} className={styles.quickAmountBtn}>₦10,000</button>
          </div>

          <button
            onClick={() => setShowAccount(true)}
            disabled={!amount}
            className={styles.generateButton}
          >
            Generate Virtual Account
          </button>
        </div>

        {showAccount && (
          <div className={styles.virtualAccountCard}>
            <div className={styles.accountHeader}>
              <span className={styles.accountIcon}>🏦</span>
              <h3>Virtual Account Details</h3>
            </div>
            <div className={styles.accountDetails}>
              <div className={styles.accountRow}>
                <span className={styles.accountLabel}>Bank:</span>
                <span className={styles.accountValue}>GT Bank</span>
              </div>
              <div className={styles.accountRow}>
                <span className={styles.accountLabel}>Account No:</span>
                <span className={styles.accountValue}>1234567890</span>
              </div>
              <div className={styles.accountRow}>
                <span className={styles.accountLabel}>Account Name:</span>
                <span className={styles.accountValue}>Campus Transport Ltd</span>
              </div>
            </div>
            <div className={styles.accountNote}>
              <p>💡 Transfer ₦{amount} to this account. Your wallet will be credited automatically.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
