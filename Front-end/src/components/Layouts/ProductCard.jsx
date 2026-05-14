function ProductCard({ phone }) {
    console.log("Inona ny ao anatin'ny phone:", phone);
    return (
        <div className="card w-96 bg-base-100 shadow-xl hover:shadow-2xl transition duration-300 rounded-2xl overflow-hidden">

            <figure className="bg-gray-100 p-4">
                <img
                    src={phone.imageUrl}
                    alt={phone.nom}
                    className="h-64 object-contain hover:scale-105 transition duration-300"
                />
            </figure>

            <div className="card-body text-center space-y-3">

                <h2 className="text-2xl font-bold text-gray-800">
                    {phone.nom}
                </h2>

                <p className="text-gray-500 text-sm">
                    {phone.details}
                </p>

                <h2 className="text-3xl font-extrabold text-primary">
                    {new Intl.NumberFormat('fr-FR').format(phone.prix)} Ar
                </h2>

                <div className="card-actions justify-center pt-4">
                    <div className="flex gap-3">

                        <button className="btn btn-outline btn-primary rounded-xl">
                            Voir détails
                        </button>

                        <button className="btn rounded-xl bg-orange-500 hover:bg-orange-600 text-white border-none">
                            Au panier
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductCard;