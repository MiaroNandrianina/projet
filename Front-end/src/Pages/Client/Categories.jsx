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
    const [search, setSearch] = useState("");

    const filterListe = phones.filter(phone =>
        phone.nom?.toLowerCase().includes(search.toLowerCase())
    );
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
        <section className="mt-12 p-4 max-w-[1200px] mx-auto mb-20 border-[2px] border-[red]">
             <div className="flex flex-col gap-4 lg:flex-row lg:items-center justify-between">
                 <div>
                     <h2 className="text-3xl font-bold font-poppins">Liste produits</h2>
                     <p className="text-gray-500">Vous pouvez consulter ici toutes les options que nous proposons.</p>
                 </div>

                 <div>
                     <label className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                         <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                             <g
                                 strokeLinejoin="round"
                                 strokeLinecap="round"
                                 strokeWidth="2.5"
                                 fill="none"
                                 stroke="currentColor"
                             >
                                 <circle cx="11" cy="11" r="8"></circle>
                                 <path d="m21 21-4.3-4.3"></path>
                             </g>
                         </svg>
                         <input type="search" className="w-full bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
                             placeholder="Recherche un téléphone..." onChange={(e) => setSearch(e.target.value)}

                         />

                 </label>
             </div>
         </div>
             {/* MOBILE */}
             <div className="md:hidden">
                 <Swiper
                     slidesPerView={1}
                     centeredSlides={true}
                     spaceBetween={20}
                     pagination={{ clickable: true }}
                     modules={[Pagination]}
                     className="mySwiper mt-10 !pb-12"
                 >
                     {filterListe.length > 0 ? (
                         filterListe.map((phone) => (
                             <SwiperSlide key={phone.id} >
                                 <DashboardCard phone={phone} />
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
                         <DashboardCard key={phone.id} phone={phone} />
                     ))
                 ) : (
                     <p className="text-gray-500 col-span-3 text-center">
                         Aucun produit trouvé
                     </p>
                 )}
             </div>

             {/* {phones.length === 0 && (
                 <p className="text-center text-gray-400">
                     pas de produit attender s'il vous plait.
                 </p>
             )} */}
         </section>
        
    )
}
export default Categories;