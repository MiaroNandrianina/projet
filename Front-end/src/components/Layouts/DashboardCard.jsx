import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext"; // Hamarino tsara raha ity ny lalana mankany amin'ny Context-nao

function DashboardCard({ phone, }) {
    // 1. Maka ny function addToCart avy ao amin'ny Context
    const { addToCart } = useContext(CartContext);

    const handleAddToCart = () => {
        // 2. Antsoina ny addToCart, ampitana ny phone sy quantité 1 (default)
        addToCart(phone, 1);
        
        // Azonao asiana "toast" na alert kely eto raha tianao
        // alert(`${phone.nom} nampiana ao anaty harona!`);
    };

    return (
        <div className="card w-96 bg-base-100 shadow-xl hover:shadow-2xl transition duration-300 rounded-2xl overflow-hidden">
            
            {/* FIGURE - SARY */}
            <figure className="bg-gray-100 p-4">
                <img
                    src={phone.imageUrl || "https://via.placeholder.com/150"} // Back-up raha tsisy sary
                    alt={phone.nom}
                    className="h-64 object-contain hover:scale-105 transition duration-300"
                />
            </figure>

            {/* BODY - INFO */}
            <div className="card-body text-center space-y-3">
                <h2 className="text-2xl font-bold text-gray-800">
                    {phone.nom}
                </h2>

                <p className="text-gray-500 text-sm line-clamp-2">
                    {phone.details}
                </p>

                <h2 className="text-3xl font-extrabold text-primary">
                    {new Intl.NumberFormat('fr-FR').format(phone.prix)} Ar
                </h2>

                {/* ACTIONS - BOKOTRA */}
                <div className="card-actions justify-center pt-4">
                    <div className="flex gap-3">
                        
                        {/* Bokotra hizaha antsipiriany */}
                        <Link 
                            to={`/Details/${phone.id}`} 
                            className="btn btn-outline btn-primary rounded-xl"
                        >
                            Voir détails
                        </Link>

                        {/* Bokotra hampiditra panier */}
                        <button 
                            onClick={handleAddToCart}
                            className="btn rounded-xl bg-orange-500 hover:bg-orange-600 text-white border-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Au panier
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardCard;