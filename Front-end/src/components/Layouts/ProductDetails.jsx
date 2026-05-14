import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
function ProductDetails() {
    const {id} = useParams();
    const [Finday, setFinday] = useState(null);

    useEffect(()=> {
        const Fecthfinday = async () =>{
            try {
                const reponse = await api.get(`/modeles/${id}`);
                setFinday(reponse.data);
            } catch (error) {
                console.error("erreur:", error);
            }
        }
        Fecthfinday();
    },[]);
    return (
        <>
            <div>
                <h2>Details:{Finday.nom}</h2>
            </div>

            <div>
                <div>
                    <img src="{Finday.imageUrl}" alt="{Finday.nom}" />
                </div>

                <div>
                    <h2>Caracteristique</h2>
                    <p>{Finday.details}</p>
                </div>

                <div className="border-[2px] border-[#ff5e00f3] rounded-lg p-4 flex justify-center flex-col gap-2">
                    <h3>Combien téléphone vous acheter</h3>
                    <p>prix: {new Intl.NumberFormat('fr-FR').format(phone.prix)} Ar</p>
                    <div className="flex items-center gap-2">
                        <label>Quantité:</label>
                        <input type="number" min={0} placeholder="1" />
                    </div>

                    <div>
                        <button className="btn btn-primary">panier</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProductDetails;