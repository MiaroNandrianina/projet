import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../services/api";
function ProductDetails() {
    const { id } = useParams();
    const [Finday, setFinday] = useState(null);

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
    if (!Finday) {
        return <div className="p-20 text-center">Andraso kely ny mombamomba azy...</div>;
    }
    return (
        <>
            <section className="mt-8 p-4">
                <div>
                    <h2>Details:{Finday.nom}</h2>
                </div>

                <div className="flex flex-col gap-8 lg:flex-row justify-between lg:gap-2">
                    <div>
                        <img src={Finday.imageUrl} alt={Finday.nom} className="w-full max-w-md h-auto object-cover rounded-xl shadow-lg" />
                    </div>

                    <div>
                        <h2>Caracteristique</h2>
                        <p>{Finday.details}</p>
                    </div>

                    <div className="border-[2px] border-[#ff5e00f3] rounded-lg p-4 flex justify-center flex-col gap-2">
                        <h3>Combien téléphone vous acheter</h3>
                        <p>prix: {new Intl.NumberFormat('fr-FR').format(Finday.prix)} Ar</p>
                        <div className="flex items-center gap-2">
                            <label>Quantité:</label>
                            <input type="number" min={0} placeholder="1" />
                        </div>

                        <div>
                            <button className="btn btn-primary">panier</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default ProductDetails;