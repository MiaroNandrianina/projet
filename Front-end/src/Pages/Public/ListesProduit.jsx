import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import api from "../../services/api";
import ProductCard from "../../components/Layouts/ProductCard";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

function ListesProduit() {
    const [phones, setPhones] = useState([]);
    const [loading, setLoading] = useState(true);

    const [Search, setSearch] = useState("");

    const filterListe = phones.filter(phone =>
        phone.nom?.toLowerCase().includes(Search.toLowerCase())
    );

    useEffect(() => {
        const fetchAllPhones = async () => {
            try {
                // Mampiasa ilay api.get efa fanaonao
                const reponse = await api.get("/modeles");
                setPhones(reponse.data);
            } catch (error) {
                console.error("Erreur:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllPhones();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-xl font-semibold">chargement en cours...</p>
            </div>
        );
    }

    return (
        <section className="mt-12 p-4 max-w-[1200px] mx-auto mb-20">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold font-poppins">
                        Liste produits
                    </h2>

                    <p className="text-gray-500">
                        Vous pouvez consulter ici toutes les options que nous proposons.
                    </p>
                </div>

                <div className="w-full lg:w-[280px]">
                    <label className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 transition-all">

                        <svg
                            className="h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </svg>

                        <input
                            type="search"
                            placeholder="Rechercher un téléphone..."
                            className="w-full bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </label>
                </div>
            </div>

            {/* MOBILE */}
            <div className="md:hidden">
                <Swiper
                    slidesPerView={1.2}
                    centeredSlides={true}
                    spaceBetween={20}
                    pagination={{ clickable: true }}
                    modules={[Pagination]}
                    className="mySwiper mt-10 !pb-12"
                >
                    {filterListe.length > 0 ? (
                        filterListe.map((phone) => (
                            <SwiperSlide key={phone.id} >
                                <ProductCard phone={phone} />
                            </SwiperSlide>
                        ))
                    ) : (
                        <p className="text-gray-500 col-span-3 text-center">
                            Aucun produit trouvé
                        </p>
                    )}
                </Swiper>
            </div>

            {/* DESKTOP */}
            <div className="hidden md:grid md:grid-cols-3 gap-8 mt-10">
                {filterListe.length > 0 ? (
                    filterListe.map((phone) => (
                        <ProductCard key={phone.id} phone={phone} />
                    ))
                ) : (
                    <p className="text-gray-500 col-span-3 text-center">
                        Aucun produit trouvé
                    </p>
                )}
            </div>

            {phones.length === 0 && (
                <p className="text-center text-gray-400">
                    pas de produit attender s'il vous plait.
                </p>
            )}
        </section>
    );
}

export default ListesProduit;