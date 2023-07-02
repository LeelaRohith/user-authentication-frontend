import axios from "axios";
import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import { useSnackbar } from "notistack";
function Forgotpassword() {
  const [email, setEmail] = useState("");
  const [sentotp, setSentotp] = useState(false);
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const [otpresponse, setOtpresponse] = useState({
    text: " ",
    otpAuthentication: " ",
  });

  const navigate = useNavigate();
  //const { enqueueSnackbar } = useSnackbar();
  const sendOtp = async () => {
    axios
      .post(
        "http://localhost:8080/api/v1/auth/resetpassword",
        {
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log("response");
        // console.log(email);
        // enqueueSnackbar(response.data.token, {
        //   variant: "success",
        //   autoHideDuration: 1000,
        // });
        setMsg(response.data.text);
        setSentotp(response.data.userExists);
      })
      .catch(function (err) {
        console.log(err.data);
      });
  };
  const resetPassword = async () => {
    axios
      .post(
        "http://localhost:8080/api/v1/auth/validateotp",
        {
          otp: otp,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        // console.log(email);
        // enqueueSnackbar(response.data.token, {
        //   variant: "success",
        //   autoHideDuration: 1000,
        // });
        console.log(response.data);

        setOtpresponse(response.data);
        if (response.data.otpAuthentication) {
          navigate("/updatepassword");
        }
      })
      .catch(function (err) {
        console.log(err.data);
      });
  };
  // console.log(email);

  return (
    <div className="app">
      <div className="login">
        <div className="title">Forgot Password</div>
        <div>
          <div className="input-field">
            <label>Enter your email </label>
            <input
              type="text"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <p style={{ textAlign: "center" }}>{msg}</p>
          </div>
          <div className="button">
            <button onClick={sendOtp}>Send Otp</button>
          </div>
          {sentotp ? (
            <div>
              <br></br>
              <div className="title" style={{ textAlign: "center" }}>
                Enter OTP
              </div>
              <div className="input-field">
                <label>Enter the otp </label>
                <input
                  type="text"
                  required
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                />
              </div>
              <div className="button">
                <button onClick={resetPassword}>Reset Password</button>
                {otpresponse.otpAuthentication ? null : (
                  <p>{otpresponse.text}</p>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
export default Forgotpassword;
