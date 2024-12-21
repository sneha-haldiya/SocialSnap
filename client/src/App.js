import Login from "./Components/Authentication/Login";
import Signup from "./Components/Authentication/Signup";
import Insta from "./Components/Insta.js";
import {BrowserRouter,Routes,Route} from "react-router-dom";


function App() {
  return (
    <div className="h-screen w-screen bg-gray-950 flex flex-col justify-center items-center">
      <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Login/>}></Route>
        <Route path = "signup" element = {<Signup/>}></Route>
        <Route path = "/insta" element = {<Insta/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
