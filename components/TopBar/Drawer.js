import React from "react";
import styles from "@/styles/Menu.module.css";
import Link from "next/link";

function Drawer({ setOpened }) {
  const hideMenu = () => {
    console.log("Update click has triggered..");
    setOpened(false);
  };

  return (
    <div className={styles.navbars}>
      <ul className={styles.navbarwrappers}>
        <li className={styles.navbarelement}>
          <a href="/" onClick={hideMenu} className={styles.text}>
            Members
          </a>
        </li>
        <li className={styles.navbarelement}>
          <a href="#" onClick={hideMenu} className={styles.text}>
            Support
          </a>
        </li>
        <li className={styles.navbarelement}>
          <a href="#" onClick={hideMenu} className={styles.text}>
            Login
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Drawer;
