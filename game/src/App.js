import {RouterProvider,createBrowserRouter,Route,createRoutesFromElements,} from "react-router-dom";
import LayoutHome from "./components/layoutHome.js";
import Play from "./components/play.js";
import Home from "./components/home.js";
import Login from "./components/login.js"
import Computer from "./components/computer.js";
import Signup from "./components/signup.js";
import PlayOnline from "./components/playOnline.js"
function App() {
  const router=createBrowserRouter(createRoutesFromElements(
    <Route path="/">
      <Route path="/" element={<LayoutHome/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/play" element={<Play/>}/>
      </Route>
      <Route path="/login"element={<Login/>}/>
      <Route path="/signup"element={<Signup/>}/>
      <Route path="/computer" element={<Computer/>}/>
      <Route path="/playOnline" element={<PlayOnline/>}/>
    </Route>
  ))
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
