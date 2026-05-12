import { Link, useLocation, Outlet  } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

function Sidebar() {
    const { logout, user } = useContext(AuthContext);
    const location = useLocation();

    const menuItems = [
        { name: "tableau de bord", path: "/dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
        { name: "Mon Profil", path: "/profil", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
        { name: "Catégories", path: "/categories", icon: "M4 6h16M4 10h16M4 14h16M4 18h16" },
        { name: "factures", path: "/factures", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    ];

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            
            <div className="drawer-content flex flex-col bg-base-200">
                {/* TOP NAVBAR (Dashboard Only) */}
                <nav className="navbar w-full bg-white border-b border-gray-100 px-4">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="size-5">
                                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                                <path d="M9 4v16"></path>
                                <path d="M14 10l2 2l-2 2"></path>
                            </svg>
                        </label>
                    </div>
                    <div className="flex-1 px-4 font-bold text-gray-700 capitalize">
                        {location.pathname.replace("/", "").replace("-", " ")}
                    </div>
                    <div className="flex-none gap-2">
                        <span className="text-sm font-medium mr-2">{user?.username ? user.username.split('@')[0] : "Mpanjifa"}</span>
                        <div className="avatar placeholder">
                            <div className="bg-primary text-black rounded-full w-8">
                                <span className="text-xs">{user?.username ? user.username.split('@')[0] : "Mpanjifa"}</span>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* PAGE CONTENT DYNAMIQUE */}
                <div className="p-6">
                    {/* Eto no hipetraka ny Route mifanaraka amin'ny menu */}
                    <Outlet />
                </div>
            </div>

            {/* SIDEBAR SIDE */}
            <div className="drawer-side z-50 overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col bg-white border-r border-gray-100 transition-all duration-300 is-drawer-close:w-20 is-drawer-open:w-64">
                    
                    {/* LOGO AREA */}
                    <div className="p-4 mb-4 flex items-center justify-center is-drawer-open:justify-start gap-3">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-primary/20">
                            M
                        </div>
                        <span className="text-xl font-bold text-gray-800 is-drawer-close:hidden transition-all">MyPhone</span>
                    </div>

                    {/* MENU LIST */}
                    <ul className="menu w-full grow px-3 gap-2">
                        {menuItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <li key={item.path}>
                                    <Link 
                                        to={item.path}
                                        className={`flex items-center gap-4 py-3 rounded-xl transition-all ${
                                            isActive 
                                            ? "bg-primary text-white shadow-md shadow-primary/20" 
                                            : "text-gray-500 hover:bg-gray-50"
                                        } is-drawer-close:justify-center is-drawer-close:tooltip is-drawer-close:tooltip-right`}
                                        data-tip={item.name}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-5 shrink-0">
                                            <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                                        </svg>
                                        <span className="is-drawer-close:hidden capitalize font-semibold text-sm">{item.name}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* FOOTER SIDEBAR */}
                    <div className="p-4 border-t border-gray-50 space-y-2">
                         <Link 
                            to="/" 
                            className="btn btn-ghost btn-sm w-full is-drawer-close:px-0 flex items-center justify-center lg:justify-start gap-4 text-blue-600 hover:bg-blue-50"
                            title="Retour accueil"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-5 shrink-0">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span className="is-drawer-close:hidden text-xs font-bold uppercase">Accueil</span>
                        </Link>

                        <button 
                            onClick={logout}
                            className="btn btn-ghost btn-sm w-full is-drawer-close:px-0 flex items-center justify-center lg:justify-start gap-4 text-red-500 hover:bg-red-50"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-5 shrink-0">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7" />
                            </svg>
                            <span className="is-drawer-close:hidden text-xs font-bold uppercase">Quitter</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;