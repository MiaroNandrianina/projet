import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api"; // Ilay axios instance-nao

function PanierDash() {
    const { cart, removeFromCart, totalPrice, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    const handleValiderCommande = async () => {
        try {
            // data any aminy symfony
            const data = {
                panier: cart.map(item => ({
                    id: item.id,
                    qte: item.qte
                }))
            };

            const response = await api.post('/commande', data);

            if (response.status === 201) {
                alert("Commande recu! merci a toi.");
                clearCart(); 
                navigate('/dashboard'); // hijery commande dashboard
            }
        } catch (error) {
            console.error("Erreur commande:", error);
            alert(error.response?.data?.error || "probleme commande envoyer. connecter vous.");
        }
    };

    if (cart.length === 0) {
        return (
            <div className="p-20 text-center space-y-4">
                <h2 className="text-2xl font-bold">Mon panier est vide 🛒</h2>
                <p className="text-gray-500">choisir vos produits.</p>
                <Link to="/categories" className="btn btn-primary rounded-full">voir telephones</Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-4 lg:p-8">
            <h1 className="text-3xl font-black mb-8 text-gray-800">Mon panier</h1>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* LISITRY NY ENTANA (LEFT) */}
                <div className="lg:col-span-2 space-y-4">
                    {cart.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                            <img src={item.imageUrl} alt={item.nom} className="w-20 h-20 object-contain" />
                            <div className="flex-1">
                                <h3 className="font-bold text-lg">{item.nom}</h3>
                                <p className="text-primary font-bold">
                                    {new Intl.NumberFormat('fr-FR').format(item.prix)} Ar
                                </p>
                                <p className="text-sm text-gray-400 font-medium">Quantité: {item.qte}</p>
                            </div>
                            <button 
                                onClick={() => removeFromCart(item.id)}
                                className="btn btn-circle btn-ghost text-red-500"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v2m3 3H8" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>

                {/* TOTAL SY VALIDER (RIGHT) */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit space-y-6">
                    <h2 className="text-xl font-bold border-b pb-4">Resumer</h2>
                    <div className="flex justify-between items-center text-lg">
                        <span className="text-gray-500">Quatité:</span>
                        <span className="font-bold">{cart.length}</span>
                    </div>
                    <div className="flex justify-between items-center text-2xl">
                        <span className="font-black">Total:</span>
                        <span className="font-black text-primary">
                            {new Intl.NumberFormat('fr-FR').format(totalPrice)} Ar
                        </span>
                    </div>
                    
                    <button 
                        onClick={handleValiderCommande}
                        className="btn btn-primary w-full btn-lg rounded-2xl text-white font-bold"
                    >
                        Valider la commande
                    </button>
                    
                </div>
            </div>
        </div>
    );
}

export default PanierDash;