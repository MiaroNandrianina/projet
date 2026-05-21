import { useEffect, useContext, useState, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import api from "../../services/api";

function PaymentSuccess() {
    const [searchParams] = useSearchParams();
    const { clearCart } = useContext(CartContext);
    const commandeId = searchParams.get("commande_id");
    const [loading, setLoading] = useState(true);
    
    
    const hasCalledApi = useRef(false);

    useEffect(() => {
        if (commandeId && !hasCalledApi.current) {
            hasCalledApi.current = true; 

            // 1. Fafana indray mandeha ny panier
            clearCart();
        
            api.post(`/commande/${commandeId}/success`)
                .then(() => {
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Erreur validation backend:", err);
                    setLoading(false);
                });
        }
    }, [commandeId]); 

    return (
        <div className="min-h-[60vh] flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-md w-full text-center space-y-6">
                {loading ? (
                    <div className="space-y-4">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                        <p className="text-gray-500 font-medium">Validation de votre commande en cours...</p>
                    </div>
                ) : (
                    <>
                        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 text-green-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black text-gray-800">Paiement Réussi ! </h2>
                            <p className="text-gray-500 font-medium">Merci pour ton achat.</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-sm font-semibold text-gray-600">
                            Commande N° : <span className="text-primary font-black">#{commandeId}</span>
                        </div>

                        <div className="pt-4">
                            <Link to="/dashboard" className="btn btn-primary w-full rounded-2xl text-white font-bold shadow-lg">
                                Voir mes commandes
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default PaymentSuccess;