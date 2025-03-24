import {RouterProvider,createBrowserRouter,Route,createRoutesFromElements,} from "react-router-dom";
import LayoutHome from "./components/layoutHome.js";
import Play from "./components/play.js";
import Home from "./components/home.js";
import Computer from "./components/computer.js";
function App() {
  const router=createBrowserRouter(createRoutesFromElements(
    <Route path="/">
      <Route path="/" element={<LayoutHome/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/play" element={<Play/>}/>
      </Route>
      <Route path="/computer" element={<Computer/>}/>
    </Route>
  ))
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
