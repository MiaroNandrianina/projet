import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react"; // Ampio useContext
import api from "../../services/api";
import { CartContext } from "../../Context/CartContext"; // Ampio CartContext

function ProductDetails() {
    const { id } = useParams();
    const [Finday, setFinday] = useState(null);
    
    // 1. Mamorona state ho an'ny quantité (default dia 1)
    const [qty, setQty] = useState(1);
    
    // 2. Alaina ny addToCart avy ao amin'ny Context
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const Fecthfinday = async () => {
            try {
                const reponse = await api.get(`/modeles/${id}`);
                setFinday(reponse.data);
            } catch (error) {
                console.error("erreur:", error);
            }
        }
        Fecthfinday();
    }, [id]);

    // Function hikarakara ny fanampiana panier
    const handleAdd = () => {
        if (qty > 0) {
            addToCart(Finday, qty);
            // Azonao asiana notification kely eto
            alert(`Nampiana ${qty} ${Finday.nom} ao anaty panier!`);
        }
    };

    if (!Finday) {
        return <div className="p-20 text-center">chargement en cours...</div>;
    }
    
    return (
        <>
            <section className="mt-8 p-4 max-w-6xl mx-auto">
                
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">Détails : {Finday.nom}</h2>
                </div>

                <div className="flex flex-col gap-8 lg:flex-row justify-between">
                    {/* SARY */}
                    <div className="flex-1">
                        <img src={Finday.imageUrl} alt={Finday.nom} className="w-full max-w-md h-auto object-cover rounded-xl shadow-lg" />
                    </div>

                    {/* CHARACTERISTIQUE */}
                    <div className="flex-1">
                        <h2 className="text-xl font-bold mb-4">Caractéristiques</h2>
                        <p className="text-gray-600 leading-relaxed">{Finday.details}</p>
                    </div>

                    {/* BOX ACHAT */}
                    <div className="border-[2px] border-[#ff5e00f3] rounded-2xl p-6 flex flex-col gap-4 h-fit bg-white shadow-sm min-w-[300px]">
                        <h3 className="font-bold text-lg">Commander ce téléphone</h3>
                        <p className="text-2xl font-black text-primary">
                            {new Intl.NumberFormat('fr-FR').format(Finday.prix)} Ar
                        </p>
                        
                        <div className="flex items-center gap-4 mt-2">
                            <label className="font-semibold text-gray-700">Quantité :</label>
                            <input 
                                type="number" 
                                min={1} 
                                value={qty}
                                onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                                className="input input-bordered w-24 text-center font-bold" 
                            />
                        </div>

                        <div className="mt-4">
                            <button 
                                onClick={handleAdd}
                                className="btn btn-primary w-full text-white font-bold text-lg"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Ajouter au panier
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductDetails;