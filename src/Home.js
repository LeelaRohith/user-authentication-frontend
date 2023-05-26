import axios from "axios";
import { useState } from "react";
function Home() {
  const [user, setUser] = useState("");
  const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
  console.log(localStorage.getItem("token"));
  axios
    .get("http://localhost:8080/api/v1/demo-controller", { headers })
    .then(function (response) {
      console.log(response.data);
      setUser(response.data);
    })
    .catch(function (err) {
      console.log(err.data);
    });

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Welcome {user} !</h1>
    </div>
  );
}
export default Home;
