import axios from "axios";
import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
function Register() {
  const [registerDetails, setRegisterdetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const register = async () => {
    axios
      .post("http://localhost:8080/api/v1/auth/register", registerDetails)
      .then(function (response) {
        console.log(response.data);
        enqueueSnackbar(response.data.token, {
          variant: "success",
          autoHideDuration: 1000,
        });
        navigate("/login");
      })
      .catch(function (err) {
        console.log(err.data);
      });
  };

  return (
    <div className="app">
      <div className="login">
        <div className="title">Register</div>
        <div>
          <div className="input-field">
            <label>Firstname </label>
            <input
              type="text"
              required
              onChange={(e) => {
                setRegisterdetails((prev) => ({
                  ...prev,
                  firstname: e.target.value,
                }));
              }}
            />
          </div>
          <div className="input-field">
            <label>Lastname </label>
            <input
              type="text"
              required
              onChange={(e) => {
                setRegisterdetails((prev) => ({
                  ...prev,
                  lastname: e.target.value,
                }));
              }}
            />
          </div>
          <div className="input-field">
            <label>Email Address </label>
            <input
              type="text"
              required
              onChange={(e) => {
                setRegisterdetails((prev) => ({
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
              required
              onChange={(e) => {
                setRegisterdetails((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
            />
          </div>
          <div className="button">
            <button onClick={register}>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
