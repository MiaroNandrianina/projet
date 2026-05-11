import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Public/Home";
import Navbar from "./components/layouts/Navbar";
function App() {
  return (
    <BrowserRouter>
       <header><Navbar /></header>

       <Routes>
         <Route path="/" element={<Home />}></Route>
       </Routes>
    </BrowserRouter>
  );
}

export default App;