function ProductCard({ phone }) {
    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img
                    src=""
                    alt="Shoes" />
            </figure>
            <div className="card-body text-center">
                <h2 className="">{phone.title}</h2>
                <p>{phone.details}</p>
                <h2>{phone.prix}</h2>
                <div className="card-actions flex justify-center items-center">
                    <div className="flex items-center gap-4">
                        <button className="btn btn-primary">Voir details</button>
                        <button className="btn bg-[#ff9100ef]">au panier</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductCard;