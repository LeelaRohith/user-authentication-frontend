import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Forgotpassword from "./Forgetpassword";
import Updatepassword from "./Updatepassword";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/homepage" element={<Home />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/updatepassword" element={<Updatepassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
