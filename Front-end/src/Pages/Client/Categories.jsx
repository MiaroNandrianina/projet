import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import api from "../../services/api";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import DashboardCard from "../../components/Layouts/DashboardCard";



function Categories() {
    const [phones, setPhone] = useState([]);
    const [Loading, setLoading] = useState(true);
    useEffect(() => {
        const FecthMobile = async () => {
            try {
                const reponse = await api.get("/modeles");
                setPhone(reponse.data);
            } catch (error) {
                alert('petite erreur');
            } finally {
                setLoading(false)
            }
        };
        FecthMobile();
    }, []);

    if (Loading) {
        return <div className="flex justify-center items-center">
            <p>chargement en cours.....</p>
        </div>
    }

    return (
        <section className="max-w-7xl mx-auto px-4 py-10">
            <div className="text-start mb-10">
                <h2 className="text-3xl font-bold font-poppins">Liste produits</h2>
                <p className="text-gray-500">Vous pouvez consulter ici toutes les options que nous proposons.</p>
            </div>
            <div className="relative">
                <Swiper slidesPerView={1.1} spaceBetween={100}  pagination={{ clickable: true, el: '.custom-pagination' }} modules={[Pagination]} breakpoints={{ 768: { slidesPerView: 3, spaceBetween: 30, enabled: false }, }} className="mySwiper !overflow-visible pb-16 md:grid md:grid-cols-3 gap-2">
                    {phones.map((phone) => (
                        <SwiperSlide key={phone.id} className="h-full">
                            <DashboardCard phone={phone} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="custom-pagination flex justify-center gap-2 mt-8 md:hidden"></div>
            </div>
        </section>
    )
}
export default Categories;