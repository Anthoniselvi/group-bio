import React from "react";
import firebase from "../firebase";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      mobile: "",
      otp: "",
    };
    this.appVerifier = null;
    this.confirmationResult = null;
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  configureCaptcha = () => {
    this.appVerifier = new firebase.auth.RecaptchaVerifier("sign-in-button", {
      size: "invisible",
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        this.onSignInSubmit();
        console.log("Recaptcha verified");
      },
      defaultCountry: "IN",
    });
  };

  onSignInSubmit = (e) => {
    e.preventDefault();
    this.configureCaptcha();
    const phoneNumber = "+91" + this.state.mobile;
    console.log(phoneNumber);
    const appVerifier = this.appVerifier;

    if (appVerifier) {
      firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          this.confirmationResult = confirmationResult;
          console.log("OTP has been sent");
        })
        .catch((error) => {
          console.error("Error sending OTP:", error);
        });
    } else {
      console.error("App verifier is not available.");
    }
  };

  onSubmitOTP = (e) => {
    e.preventDefault();
    const code = this.state.otp;
    console.log(code);
    if (this.confirmationResult) {
      this.confirmationResult
        .confirm(code)
        .then((result) => {
          // User signed in successfully.
          const user = result.user;
          console.log(JSON.stringify(user));
          alert("User is verified");
          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          console.error("Error confirming OTP", error);
        });
    } else {
      console.error("Confirmation result is not available.");
    }
  };

  render() {
    return (
      <div>
        <h2>Login Form</h2>
        <form onSubmit={this.onSignInSubmit}>
          <div id="sign-in-button"></div>
          <input
            type="number"
            name="mobile"
            placeholder="Mobile number"
            required
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>

        <h2>Enter OTP</h2>
        <form onSubmit={this.onSubmitOTP}>
          <input
            type="number"
            name="otp"
            placeholder="OTP Number"
            required
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default SignUp;
