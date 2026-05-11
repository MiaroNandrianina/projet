import { BrowserRoute, Routes, Route } from "react-router-dom";
function App() {

  return (
    <BrowserRouter>
       <header></header>

       <Route>
         <Route path="" element={Accueil}></Route>
       </Route>
    </BrowserRouter>
  )
}

export default App
