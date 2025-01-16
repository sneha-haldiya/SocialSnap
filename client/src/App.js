import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Components/Authentication/Login";
import Signup from "./Components/Authentication/Signup";
import Home from "./Components/Home.js";

function App() {
  return (
    <div className="h-screen w-screen bg-gray-950 flex flex-col justify-center items-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="signup" element={<Signup />}></Route>
          <Route path="/home/*" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div >
  );
}
export default App;
