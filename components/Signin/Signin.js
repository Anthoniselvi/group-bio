import { ArrowBack, ArrowForward } from "@mui/icons-material";
import React from "react";
import styles from "@/styles/Signin.module.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import EastIcon from "@mui/icons-material/East";

const Signin = () => {
  return (
    <div className={styles.signin_container}>
      <div className={styles.signin_top}>
        <div className={styles.signin_toptext}>
          <KeyboardBackspaceIcon style={{ color: "#fff" }} />
          <p>Login With Mobile Number</p>
        </div>
      </div>
      <div className={styles.signin_bottom}>
        <div className={styles.signin_bottomtext}>
          <div className={styles.signin_bottominnertext}>
            <input
              className={styles.signin_bottominput}
              type="number"
              placeholder="Enter your Mobile Number"
            />
            <p>We will send you On-Time-Password (OTP)</p>
          </div>
        </div>
        <div className={styles.signin_button}>
          <EastIcon className={styles.button} />
        </div>
      </div>
    </div>
  );
};

export default Signin;
