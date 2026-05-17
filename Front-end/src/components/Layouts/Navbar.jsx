import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { CartContext } from "../../Context/CartContext";
import { useState, useEffect } from "react";
import api from "../../services/api";


function Navbar() {
    // Alaina ny user sy ny logout avy ao amin'ny Context
    const { user, logout } = useContext(AuthContext);
    const { cartCount } = useContext(CartContext);

    //........ logique brand........ //
    const [Brands, setBrands] = useState([]);
    useEffect(() => {
        const BrandsFetch = async () => {
            try {
                const reponse = await api.get("/marque");
                setBrands(reponse.data);
            } catch (error) {
                console.error("erreur brands:", error)
            }
        }
        BrandsFetch();
    }, []);

    // .........logique modeles.............//
    const [Modeles, setModeles] = useState([]);
    useEffect(() => {
        const ModelesFecth = async () => {
            try {
                const reponse = await api.get("/modeles");
                setModeles(reponse.data);
                console.log("Ito ny data azo avy any amin'ny /modeles :", reponse.data);
            } catch (error) {
                console.error("erreur modeles:", error);
            }
        }
        ModelesFecth();
    }, []);

    return (
        <div className="navbar bg-white px-4 lg:px-8 shadow-sm border-b border-gray-100 sticky top-0 z-50">

            {/* LEFT - LOGO */}
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[100] w-52 rounded-2xl bg-base-100 p-2 shadow-xl text-gray-700 font-semibold">
                        <li><Link to="/">Accueil</Link></li>
                        <li><Link to="/Service">Service</Link></li>
                        <li><Link to="/Apropos">A propos</Link></li>
                        <li><Link to="/Contact">Contact</Link></li>
                    </ul>
                </div>

                <Link to="/" className="flex items-center gap-2">
                    <span className="text-2xl font-black text-[#2563eb] tracking-tighter uppercase">
                        MyPhone
                    </span>
                </Link>
            </div>

            {/* CENTER - MENU PRINCIPAL */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal gap-1 px-1 font-bold text-gray-600">
                    <li><Link to="/" className="hover:text-[#2563eb] rounded-xl transition duration-200">Accueil</Link></li>

                    <li className="relative">
                        <details>
                            <summary className="hover:text-[#2563eb] rounded-xl transition duration-200 cursor-pointer list-none">
                                Catégories
                            </summary>

                            <div className="bg-white rounded-xl p-4 shadow-lg w-[600px] border border-gray-100 mt-3 absolute z-50">

                                {/* FLEX BRANDS */}
                                <div className="flex gap-6 flex-wrap">
                                    <div className="flex gap-6 flex-wrap">
                                        {Brands.map(brand => (
                                            <div key={brand.id} className="min-w-[120px]">
                                
                                                <span className="font-semibold text-[#0066ff] block border-b border-gray-100 pb-1">
                                                    {brand.nom}
                                                </span>

                                                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                                                    {Modeles
                                                        .filter(model => model.marque && model.marque.id == brand.id)
                                                        .map(model => (
                                                            <li key={model.id}>
                                                                <Link to={`/product/${model.id}`} className="hover:text-blue-500 block py-0.5 cursor-pointer">
                                                                    {model.nom}
                                                                </Link>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </details>
                    </li>


                    <li><Link to="/Service" className="hover:text-[#2563eb] rounded-xl transition duration-200">Service</Link></li>
                    <li><Link to="/Apropos" className="hover:text-[#2563eb] rounded-xl transition duration-200">A propos</Link></li>
                    <li><Link to="/contact" className="hover:text-[#2563eb] rounded-xl transition duration-200">Contact</Link></li>
                </ul>
            </div>

            {/* RIGHT - AUTH LOGIC */}
            <div className="navbar-end gap-3">
                <Link to="/cart" className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {/* Ity no badge mena kely mampiseho ny isa */}
                        {cartCount > 0 && (
                            <span className="badge badge-sm badge-primary indicator-item text-white border-none">
                                {cartCount}
                            </span>
                        )}
                    </div>
                </Link>
                {!user ? (
                    /* RAHA TSY CONNECTÉ */
                    <div className="flex items-center gap-2">
                        <Link to="/Login" className="btn btn-ghost text-[#2563eb] font-bold rounded-full px-6 hover:bg-blue-50">
                            Connexion
                        </Link>
                        <Link to="/Register" className="btn bg-[#2563eb] hover:bg-blue-700 text-white border-none rounded-full px-6 shadow-md shadow-blue-200">
                            S'inscrire
                        </Link>
                    </div>
                ) : (
                    /* RAHA EFA CONNECTÉ */
                    <div className="flex items-center gap-2">

                        {/* 1. LIEN DASHBOARD - Hiverenana ao amin'ny Sidebar */}
                        <Link
                            to="/dashboard"
                            className="btn btn-sm h-10 bg-[#2563eb] hover:bg-blue-700 text-white border-none rounded-full px-5 font-bold shadow-sm flex items-center gap-2"
                        >

                            Dashboard
                        </Link>

                        {/* 2. PROFIL / USER INFO */}
                        <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-100 py-1 pl-1 pr-4 rounded-full">
                            <div className="avatar placeholder">
                                <div className="bg-blue-100 text-[#2563eb] rounded-full w-8">
                                    <span className="text-xs font-black">{user.username?.charAt(0).toUpperCase()}</span>
                                </div>
                            </div>
                            <span className="text-xs font-black text-gray-700 uppercase tracking-tight">
                                {user.username}
                            </span>
                        </div>

                        {/* 3. LOGOUT ICON */}
                        <button
                            onClick={logout}
                            title="Déconnexion"
                            className="btn btn-ghost btn-circle btn-sm text-red-500 hover:bg-red-50 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;