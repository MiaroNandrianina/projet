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
            <div className="text-start mb-10">
                <h2 className="text-3xl font-bold font-poppins">Liste produits</h2>
                <p className="text-gray-500">Vous pouvez consulter ici toutes les options que nous proposons.</p>
            </div>

            <Swiper
                slidesPerView={1.2}
                spaceBetween={20}
                pagination={{ clickable: true }}
                modules={[Pagination]}
                breakpoints={{
                    
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                        enabled: false, 
                    },
                }}
    
                className="mySwiper mt-10 !pb-12 md:!grid md:!grid-cols-3 md:!gap-8"
            >
                {phones.map((phone) => (
                    <SwiperSlide key={phone.id} className="md:!h-auto flex justify-center">
                        <ProductCard phone={phone} />
                    </SwiperSlide>
                ))}
            </Swiper>
            
            {phones.length === 0 && (
                <p className="text-center text-gray-400">pas de produit attender s'il vous plait.</p>
            )}
        </section>
    );
}

export default ListesProduit;