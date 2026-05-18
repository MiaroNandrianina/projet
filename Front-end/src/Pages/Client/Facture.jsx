import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api"; 

function Facture() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [commande, setCommande] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFactureDetail = async () => {
            try {
                const response = await api.get(`/commande/${id}`);
                setCommande(response.data);
            } catch (error) {
                console.error("Erreur validation facture:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchFactureDetail();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <span className="loading loading-spinner loading-large text-primary"></span>
            </div>
        );
    }

    if (!commande) {
        return (
            <div className="p-6 text-center space-y-4">
                <p className="text-red-500 font-bold">Facture introuvable ou erreur de chargement.</p>
                <button className="btn btn-sm btn-outline" onClick={() => navigate(-1)}>Retour</button>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            {/* Bokotra Fiverenana */}
            <div className="flex justify-between items-center no-print">
                <button className="btn btn-sm btn-ghost gap-2 text-gray-500" onClick={() => navigate(-1)}>
                    ← Retour au Dashboard
                </button>
                <button className="btn btn-primary btn-sm text-white rounded-xl shadow-md" onClick={() => window.print()}>
                    Imprimer la facture
                </button>
            </div>

            {/* Ny Endrika Faktiora Tena Izy (Azo atao printy tsara) */}
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 space-y-8 print:p-0 print:shadow-none print:border-none">
                {/* Lohateny sy Logo */}
                <div className="flex justify-between items-start border-b border-gray-100 pb-6">
                    <div>
                        <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tight">FACTURE</h1>
                        <p className="text-primary font-bold text-sm">N° #000{commande.id}</p>
                        <p className="text-gray-400 text-xs mt-1">
                            Date: {new Date(commande.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                    </div>
                    <div className="text-right">
                        <h2 className="font-black text-lg text-gray-800">Myphone</h2>
                        <p className="text-gray-400 text-xs">Antananarivo, Madagascar</p>
                    </div>
                </div>

                {/* Ny Entana Novidiana */}
                <div className="overflow-x-auto">
                    <table className="table w-full text-sm">
                        <thead>
                            <tr className="text-gray-500 border-b border-gray-100 bg-gray-50/50">
                                <th>Désignation Phone</th>
                                <th className="text-center">Quantité</th>
                                <th className="text-right">Prix Unitaire</th>
                                <th className="text-right">Sous-total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {commande.items && commande.items.map((item) => (
                                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/30">
                                    <td className="font-bold text-gray-700 p-4">{item.telephone}</td>
                                    <td className="text-center font-black p-4">{item.quantite}</td>
                                    <td className="text-right p-4">{new Intl.NumberFormat('fr-FR').format(item.prixUnitaire)} Ar</td>
                                    <td className="text-right font-black text-gray-800 p-4">{new Intl.NumberFormat('fr-FR').format(item.sousTotal)} Ar</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Ny Vola Rehetra sy ny Statut */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50/70 p-6 rounded-2xl border border-gray-100 gap-4">
                    <div>
                        <span className="text-xs text-gray-400 uppercase font-black block tracking-wider mb-1">Statut du Paiement</span>
                        <span className={`badge text-white font-bold px-4 py-3 text-xs rounded-full ${
                            commande.status === 'En attente' ? 'badge-warning' : 'badge-success'
                        }`}>
                            {commande.status}
                        </span>
                    </div>
                    <div className="sm:text-right">
                        <span className="text-xs text-gray-400 uppercase font-black block tracking-wider mb-1">Net à Payer</span>
                        <span className="text-2xl font-black text-primary">
                            {new Intl.NumberFormat('fr-FR').format(commande.total)} Ar
                        </span>
                    </div>
                </div>

                {/* Fanamarihana Eo Ambany */}
                <div className="text-center pt-6 border-t border-gray-50 text-xs text-gray-400">
                    <p>Merci pour votre confiance ! Pour toute réclamation, veuillez nous contacter.</p>
                </div>
            </div>
        </div>
    );
}

export default Facture;