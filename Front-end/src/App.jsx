import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthProvider, AuthContext } from "./Context/AuthContext";

// Layouts
import Sidebar from "./components/Layouts/Sidebar"; 
import Navbar from "./components/layouts/Navbar";

// Pages
import Home from "./Pages/Public/Home";
import Login from "./Pages/Public/Login";
import Register from "./Pages/Public/Register";
import Dashboard from "./Pages/Client/Dashboard";
import Footer from "./components/Layouts/Footer";
import ProductDetails from "./components/Layouts/ProductDetails";

function AppContent() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-base-200">
        <Routes>
          {/* 1. PEJY HO AN'NY DAHOLOBE (Home, Login, sns.) */}
          <Route element={<><header className="fixed top-0 w-full z-50"><Navbar /></header><main className="pt-16"><Outlet /><Footer /></main></>}>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={!user ? <Login /> : <Navigate to="/dashboard" replace />} />
            <Route path="/Register" element={!user ? <Register /> : <Navigate to="/dashboard" replace />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Route>

          {/* 2. PEJY AO ANATY DASHBOARD (Sidebar) */}
          {user ? (
            <Route element={<Sidebar />}>
              <Route path="/dashboard" element={<Dashboard />} />
              {/*  page  /profil et /factures */}
            </Route>
          ) : (
            /* Raha mbola tsy connecte izy nefa mitady hiditra Dashboard */
            <Route path="/dashboard" element={<Navigate to="/Login" replace />} />
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;