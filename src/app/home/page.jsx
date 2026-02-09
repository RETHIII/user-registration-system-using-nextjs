"use client";
import styles from "./home.module.css";

export default function Home() {
  return (
    <div className={styles.hero}>
      <div className={styles.overlay}>
        <h1>WELCOME<br />TO OUR PAGE</h1>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <button>LEARN MORE</button>
      </div>
    </div>
  );
}
