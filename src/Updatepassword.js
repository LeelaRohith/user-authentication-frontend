import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import "./login.css";
function Updatepassword() {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const updatePassword = (async) => {
    if (password === confirmpassword) {
      console.log(password);
      axios
        .post(
          "http://localhost:8080/api/v1/auth/updatepassword",
          {
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(function (response) {
          console.log(response.data);

          enqueueSnackbar("Password updated Successfully", {
            variant: "success",
            autoHideDuration: 5000,
          });
          navigate("/login");
        })
        .catch(function (err) {
          // console.log(err.data);
          // enqueueSnackbar("Invalid Credentials", {
          //   variant: "error",
          //   autoHideDuration: 1000,
          // });
        });
    } else {
      setStatus("passwords do not match");
    }
  };

  return (
    <div className="app">
      <div className="login">
        <div className="title">Update Password</div>
        <div>
          <div className="input-field">
            <label>Enter your password</label>
            <input
              type="password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="input-field">
            <label>Confirm Password </label>
            <input
              type="password"
              // name="pass"
              required
              onChange={(e) => {
                setConfirmpassword(e.target.value);
              }}
            />
          </div>
          <br></br>
          <div>{status}</div>
          <div className="button">
            <button onClick={updatePassword}>Updatepassword</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Updatepassword;
