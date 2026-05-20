// import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
// import { useContext } from "react";
// import { AuthProvider, AuthContext } from "./Context/AuthContext";

// // Layouts
// import Sidebar from "./components/Layouts/Sidebar"; 
// import Navbar from "./components/layouts/Navbar";

// // Pages
// import Home from "./Pages/Public/Home";
// import Login from "./Pages/Public/Login";
// import Register from "./Pages/Public/Register";
// import Dashboard from "./Pages/Client/Dashboard";
// import Footer from "./components/Layouts/Footer";
// import ProductDetails from "./components/Layouts/ProductDetails";
// import ListesProduit from "./Pages/Public/ListesProduit";
// import { CartProvider } from "./Context/CartContext";
// import Cart from "./Pages/Public/Cart";
// import Profil from "./Pages/Client/Profil";
// import Categories from "./Pages/Client/Categories";
// import PanierDash from "./Pages/Client/PanierDash";
// import Facture from "./Pages/Client/Facture";


// function AppContent() {
//   const { user } = useContext(AuthContext);

//   return (
//     <BrowserRouter>
//       <div className="min-h-screen bg-base-200">
//         <Routes>
//           {/* 1. PEJY HO AN'NY DAHOLOBE (Home, Login, sns.) */}
//           <Route element={<><header className="fixed top-0 w-full z-50"><Navbar /></header><main className="pt-16"><Outlet /><Footer /></main></>}>
//             <Route path="/" element={<Home />} />
//             <Route path="/Login" element={!user ? <Login /> : <Navigate to="/dashboard" replace />} />
//             <Route path="/Register" element={!user ? <Register /> : <Navigate to="/dashboard" replace />} />
//             <Route path="/product/:id" element={<ProductDetails />} />
//             <Route path="/liste-produits" element={<ListesProduit />} />
//             <Route path="/cart" element={<Cart />} />
//           </Route>

//           {/* 2. PEJY AO ANATY DASHBOARD (Sidebar) */}
//           {user ? (
//             <Route element={<Sidebar />}>
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/profil" element={<Profil />} />
//               <Route path="/categories" element={<Categories />} />
//               <Route path="/Details/:id" element={<ProductDetails />} />
//               <Route path="/panier" element={<PanierDash />} />
//               <Route path="/dashboard/facture/:id" element={<Facture />} />
//               {/*  page  /profil et /factures */}
//             </Route>
//           ) : (
//             /* Raha mbola tsy connecte izy nefa mitady hiditra Dashboard */
//             <Route path="/dashboard" element={<Navigate to="/Login" replace />} />
//           )}
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }

// function App() {
//   return (
//     <AuthProvider>
//       <CartProvider>
//         <AppContent />
//       </CartProvider>
//     </AuthProvider>
//   );
// }

// export default App;
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
import ListesProduit from "./Pages/Public/ListesProduit";
import { CartProvider } from "./Context/CartContext";
import Cart  from "./Pages/Public/Cart";
import Profil from "./Pages/Client/Profil";
import Categories from "./Pages/Client/Categories";
import PanierDash from "./Pages/Client/PanierDash";
import Facture from "./Pages/Client/Facture";


function ProtectedRoute() {
  const { user } = useContext(AuthContext);
  return user ? <Outlet /> : <Navigate to="/Login" replace />;
}

function AppContent() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-base-200">
        <Routes>
          {/*  Page public  */}
          <Route element={<><header className="fixed top-0 w-full z-50"><Navbar /></header><main className="pt-16"><Outlet /><Footer /></main></>}>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={!user ? <Login /> : <Navigate to="/dashboard" replace />} />
            <Route path="/Register" element={!user ? <Register /> : <Navigate to="/dashboard" replace />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/liste-produits" element={<ListesProduit />} />
            <Route path="/cart" element={<Cart />} />
          </Route>

          {/*  page connecter */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Sidebar />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profil" element={<Profil />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/Details/:id" element={<ProductDetails />} />
              <Route path="/panier" element={<PanierDash />} />
              <Route path="/dashboard/facture/:id" element={<Facture />} />
            </Route>
          </Route>

          {/*  REDIRECTION RAHA MISY LALANA DISO NA TSY MISY */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;