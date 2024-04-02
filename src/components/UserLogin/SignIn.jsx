import * as React from "react";
import { useState, useEffect } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./SignIn.css";
import login1Svg from "../../assets/Login2.svg";
import login2Svg from "../../assets/Login1.svg";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import data_set from "../../Services/DataService";
import liveLocation from "../../assets/Logo Global NTT DATA Future Blue RGB.png";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const registered_Users = data_set().users;

  const navigate = useNavigate();

  const validateEmail = (value) => {
    let error;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  };

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmailError(validateEmail(value));
    }
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.email.length === 0) {
      console.log(user.email.length === 0);
      setEmailError("Email is required*");
      return;
    }
    if (user.password.length === 0) {
      setPasswordError("Password is required*");
      return;
    }
    const existingUser = registered_Users.filter((registeredUser) =>
      user.email === registeredUser.email ? user : null
    );
    if (existingUser.length == 0) {
      setOpen(true);
      return;
    }
    if (user.password === existingUser[0].password) {
      navigate("/dashboard");
    } else {
      setOpen(true);
    }
  };

  // const handleSignUpClick = () => {
  //   navigate("/signup");
  // };

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 3); // Assuming you have 3 images
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const images = [
    { name: login1Svg, style: { width: "97%", height: "97%" } },
    {
      name: liveLocation,
      style: { width: "97%", height: "67%" },
    },
    { name: login2Svg, style: { width: "97%", height: "97%" } },
  ];

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className="signInViewBoard">
      <div className="logoBox ">
        <div className="corousal">
          <img
            src={images[currentIndex].name}
            alt=""
            srcset=""
            style={images[currentIndex].style}
          />
        </div>
        <div className="corousal-pointer-div">
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
        <div className="signInContainer">
          <div className="credentialContainer">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                width: "92%",
                marginTop: "10%",
              }}
            >
              <div className="nlogo">
                <img
                  src={liveLocation}
                  alt="logo"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
              <div id="head-tag">
                <h4>Welcome admin!!!</h4>
              </div>
            </div>
            <form onSubmit={handleSubmit} id="credentials">
              <div className="fields">
                <label htmlFor="email" className="label">
                  Login Id
                </label>
                <TextField
                  type="text"
                  name="email"
                  placeholder="Email Id"
                  className="input-field"
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
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="input-field"
                  helperText={passwordError}
                  error={!!passwordError}
                  onChange={handleChange}
                />
                <div
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                </div>
              </div>
              {/* <div className="forget">
                <span> Forgot Password?</span>
              </div> */}
              <div className="signIn-button">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="submit-button"
                >
                  Sign In
                </Button>
              </div>
            </form>
            <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={handleClose}
              message="Please Enter Valid Credentials"
              action={action}
              sx={{ color: "red" }}
            />
            {/* <div className="signIn-link">
              <p>Don't have an account?</p>
              <h4
                onClick={handleSignUpClick}
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
              >
                Sign Up
              </h4>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
