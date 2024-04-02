import * as React from "react";
import { useState, useEffect } from "react";
import "../UserLogin/SignIn.css";
import login1Svg from "../../assets/Login2.svg";
import login2Svg from "../../assets/Login1.svg";
import liveLocation from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";

export default function Register() {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/");
  };

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  };

  const validatePassword = (value) => {
    let error;
    if (!value) {
      error = "Password is required";
    }
    return error;
  };

  const validateFirstName = (value) => {
    let error;
    if (!value) {
      error = "First name is required";
    } else if (value.length < 2) {
      error = "First name should be at least 2 characters long";
    }
    return error;
  };

  const validateLastName = (value) => {
    let error;
    if (!value) {
      error = "Last name is required";
    } else if (value.length < 2) {
      error = "Last name should be at least 2 characters long";
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "fname") {
      setFirstNameError(validateFirstName(value));
    } else if (name === "lname") {
      setLastNameError(validateLastName(value));
    } else if (name === "email") {
      setEmailError(validateEmail(value));
    } else if (name === "password") {
      setPasswordError(validatePassword(value));
    }
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 3); // Assuming you have 3 images
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const images = [login1Svg, liveLocation, login2Svg];

  const handleSubmit = (values, { setSubmitting }) => {
    // Handle form submission
    console.log(values);
    // Reset form after submission
    setSubmitting(false);
    navigate("/");
  };

  return (
    <div className="signInViewBoard">
      <div className="logoBox">
        <div className="corousal">
          <img
            src={images[currentIndex]}
            alt=""
            srcset=""
            style={{
              width: "97%",
              height: "97%",
            }}
          />
        </div>
        <div
          style={{
            width: "5%",
            display: "flex",
            justifyContent: "space-between",
            marginTop: "2em",
            height: "20px",
          }}
        >
          {currentIndex === 0 && (
            <>
              <div className="active"></div>
              <div className="inactive"></div>
              <div className="inactive"></div>
            </>
          )}

          {currentIndex === 1 && (
            <>
              <div className="inactive"></div>
              <div className="active"></div>
              <div className="inactive"></div>
            </>
          )}

          {currentIndex === 2 && (
            <>
              <div className="inactive"></div>
              <div className="inactive"></div>
              <div className="active"></div>
            </>
          )}
        </div>
      </div>
      <div className="signInBox" style={{ backgroundColor: "#f9fbfe" }}>
        <div className="credentialContainer">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              width: "92%",
            }}
          >
            <div className="nlogo">
              <img src={liveLocation} alt="logo" />
            </div>
            <div id="head-tag">
              <h4>Welcome admin!!!</h4>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            id="credentials"
            style={{
              height: "80%",
            }}
          >
            <div className="fields">
              <label htmlFor="fname" className="label">
                First Name
              </label>
              <TextField
                type="text"
                name="fname"
                placeholder="First Name"
                className="input-field"
                required
                helperText={firstNameError}
                error={!!firstNameError}
                onChange={handleChange}
              />
            </div>
            <div className="fields">
              <label htmlFor="lname" className="label">
                Last Name
              </label>
              <TextField
                type="text"
                name="lname"
                placeholder="Last Name"
                className="input-field"
                required
                helperText={lastNameError}
                error={!!lastNameError}
                onChange={handleChange}
              />
            </div>
            <div className="fields">
              <label htmlFor="email" className="label">
                Email
              </label>
              <TextField
                type="email"
                name="email"
                placeholder="Email Id"
                className="input-field"
                required
                helperText={emailError}
                error={!!emailError}
                onChange={handleChange}
              />
            </div>
            <div className="fields">
              <label htmlFor="password" className="label">
                Password
              </label>
              <TextField
                type="password"
                name="password"
                placeholder="Password"
                className="input-field"
                required
                helperText={passwordError}
                error={!!passwordError}
                onChange={handleChange}
              />
            </div>
            <div className="signIn-button" style={{ marginTop: "1em" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="submit-button"
              >
                Sign Up
              </Button>
            </div>
          </form>

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontFamily: "sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                lineHeight: "16px",
                letterSpacing: "0em",
                textAlign: "left",
                color: "#00000080",
              }}
            >
              Already have an account?
            </p>
            <h4
              style={{
                marginLeft: "2%",
                fontFamily: "sans-serif",
                fontSize: "15px",
                fontWeight: 600,
                lineHeight: "18px",
                letterSpacing: "0em",
                textAlign: "left",
                color: "#0072BC",
                cursor: "pointer",
              }}
              onClick={handleSignInClick}
            >
              Sign In
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
