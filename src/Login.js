import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import "./login.css";
function Login() {
  const [userDetails, setUserdetails] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const login = (async) => {
    axios
      .post("http://localhost:8080/api/v1/auth/authenticate", userDetails)
      .then(function (response) {
        console.log(response.data.token);
        localStorage.setItem("token", response.data.token);
        enqueueSnackbar("Successfully Logged in", {
          variant: "success",
          autoHideDuration: 1000,
        });
        navigate("/homepage");
      })
      .catch(function (err) {
        console.log(err.data);
        enqueueSnackbar("Invalid Credentials", {
          variant: "error",
          autoHideDuration: 1000,
        });
      });
  };
  return (
    <div className="app">
      <div className="login">
        <div className="title">Login</div>
        <div>
          <div className="input-field">
            <label>Email Address</label>
            <input
              type="text"
              name="uemail"
              required
              onChange={(e) => {
                setUserdetails((prev) => ({
                  ...prev,
                  email: e.target.value,
                }));
              }}
            />
          </div>
          <div className="input-field">
            <label>Password </label>
            <input
              type="password"
              name="pass"
              required
              onChange={(e) => {
                setUserdetails((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
            />
          </div>
          <div className="button">
            <button onClick={login}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
