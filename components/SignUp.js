import { useState } from "react";
import axios from "axios";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
function SignUp() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");

  const auth = getAuth();
  window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
    size: "invisible",
    callback: (response) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      onSignInSubmit();
    },
  });

  const appVerifier = window.recaptchaVerifier;
  const sendOTP = () => {
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
      });
  };
  const code = getCodeFromUserInput();

  const handleSignUp = () => {
    confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
      });
  };

  const handleSendOTP = async () => {
    try {
      // Replace 'your-backend-url' with your actual backend API endpoint for OTP generation.
      const response = await axios.post("http://localhost:3000/api/otp", {
        action: "request-otp",
        phoneNumber,
      });

      if (response.data.success) {
        setOtpSent(true);
        setMessage("OTP sent successfully");
      } else {
        setMessage("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setMessage("An error occurred during OTP sending.");
    }
  };

  const handleLogin = async () => {
    try {
      // Replace 'your-backend-url' with your actual backend API endpoint for OTP verification.
      const response = await axios.post("http://localhost:3000/api/otp", {
        action: "verify-otp",
        phoneNumber,
        otp,
      });

      if (response.data.success) {
        setMessage("Login successful!");
      } else {
        setMessage("Login failed. Please check your OTP.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setMessage("An error occurred during login.");
    }
  };

  return (
    <div style={{ paddingTop: "20vh" }}>
      <h1>Mobile Signup with OTP</h1>
      <input
        type="text"
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      {!otpSent ? (
        <button onClick={handleSendOTP}>Send OTP</button>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </>
      )}
      <p>{message}</p>
    </div>
  );
}

export default SignUp;
