import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom"; // <--- ITY NO TSY AMPY TEALOHA KA NAHATONGA AN'ILAY ERREUR!
import { AuthContext } from "../../Context/AuthContext";
import { CartContext } from "../../Context/CartContext";
import api from "../../services/api"; 

function Dashboard() {
    const { user } = useContext(AuthContext);
    const { cart } = useContext(CartContext); 

    // State hitahirizana ny data avy any amin'ny Symfony
    const [stats, setStats] = useState({ totalCommandes: 0, totalDepense: 0, commandes: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await api.get("/stat"); 
                setStats(response.data);
            } catch (error) {
                console.error("Erreur stats dashboard:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchDashboardData();
        }
    }, [user]);

    return (
        <div className="p-6 space-y-8">
            <div>
                <h1 className="text-2xl font-black text-gray-800">
                    Bonjour, <span className="text-primary">{user?.username || "Client"}</span> ! 
                </h1>
                <p className="text-gray-500 text-sm">vous avez trouver ici leur dashoboard.</p>
            </div>

            {/* Bokotra Stats kely telo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div>
                        <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Commandes</p>
                        <h2 className="text-2xl font-black">{stats.totalCommandes}</h2>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div>
                        <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Total depense</p>
                        <h2 className="text-2xl font-black">
                            {new Intl.NumberFormat('fr-FR').format(stats.totalDepense)} Ar
                        </h2>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div>
                        <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Statut Panier</p>
                        {cart && cart.length > 0 ? (
                            <h2 className="text-sm font-bold text-orange-500">produits ({cart.length})</h2>
                        ) : (
                            <h2 className="text-sm font-bold text-gray-400">Vide</h2>
                        )}
                    </div>
                </div>
            </div>

            {/* Tabilao ny commande farany */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                    <h3 className="font-black text-gray-800">Dernier commande</h3>
                    <button className="btn btn-ghost btn-xs text-primary">voir toutes</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th>Ref</th>
                                <th>Date</th>
                                <th>argent</th>
                                <th>Statut</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="text-center p-10">
                                        <span className="loading loading-spinner text-primary"></span>
                                    </td>
                                </tr>
                            ) : (stats.commandes && stats.commandes.length > 0) ? (
                                stats.commandes.map((cmd) => (
                                    <tr key={cmd.id} className="hover:bg-gray-50 border-b border-gray-100">
                                        {/* ETO NY REF NO LASA LIEN AZO TSINDRINAANKANY AMIN'NY FACTURE */}
                                        <td className="font-bold">
                                            <Link 
                                                to={`/dashboard/facture/${cmd.id}`} 
                                                className="link link-primary no-underline hover:underline"
                                            >
                                                #{cmd.id}
                                            </Link>
                                        </td>
                                        <td>{new Date(cmd.createdAt).toLocaleDateString('fr-FR')}</td>
                                        <td className="font-bold text-gray-800">
                                            {new Intl.NumberFormat('fr-FR').format(cmd.total)} Ar
                                        </td>
                                        <td>
                                            <span className={`badge text-white px-3 py-2 font-semibold text-xs rounded-full ${
                                                cmd.status === 'En attente' ? 'badge-warning' : 'badge-success'
                                            }`}>
                                                {cmd.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center p-10 text-gray-400">
                                        vous n'avez pas encore acheter.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;