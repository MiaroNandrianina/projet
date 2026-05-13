import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import ProductCard from "../../components/Layouts/ProductCard";

function Home() {
    const fake = [
        { id: 1, Title: "Iphone 14 Pro", details: "Camera:48Mp Ram:128gb", prix: "2 500 000" },
        { id: 2, Title: "Nokia x6", details: "Camera:24Mp Ram:64gb", prix: "500 000" },
        { id: 3, Title: "Redmi 8 Pro", details: "Camera:48Mp Ram:128gb", prix: "1 500 000" },
    ]
    const features = [
        { id: 1, Legend: "Livraison rapide", para: "Recevez vos commandes en un temps record", icon: <i className="fa-solid fa-truck-fast text-[#43b9e0] text-5xl"></i> },
        { id: 2, Legend: "Garantie Sécurisée", para: "Des téléphones garantie jusqu'à 2 ans", icon: <i class="fa-solid fa-shield-halved text-[#43b9e0] text-5xl"></i> },
        { id: 3, Legend: "Paiement facile", para: "Transaction sécurisée et options flexibles", icon: <i class="fa-brands fa-cc-paypal text-[#43b9e0] text-5xl"></i> }
    ]
    return (

        <>
            <section class="mt-12 p-4 lg:mt-4">
                <div class="hero bg-gradient-to-bl from-violet-500 to-fuchsia-500 rounded-lg">
                    <div class="hero-content flex-col gap-4 lg:flex-row-reverse">
                        <img src="/src/assets/hero.png" class="rounded-lg shadow-2xl" />
                        <div>
                            <h1 class="text-5xl font-bold text-white">Découvrez les meilleurs smartphones au meilleur prix</h1>
                            <p class="py-6 text-white text-xl">
                                Profitez des dernières technologies avec nos téléphones performants, élégants et accessibles.
                                Livraison rapide et garantie incluse.
                            </p>
                            <button class="btn bg-[#D4AF37]">Get Started</button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-12 p-4">
                <div className="text-center">
                    <h2 className="text-2xl font-bold font-poppins">Nos Smartphones</h2>
                    <p>Découvrir notre sélection de télephones les plus demandés, alliant perfomance,design et prix accessible.</p>
                </div>

                <Swiper slidesPerView={1.2} spaceBetween={20} pagination={{ clickable: true, }} modules={[Pagination]} breakpoints={{
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                        enabled: false,
                    },
                }}
                    className="mySwiper max-w-[1200px] mt-14" >
                    {fake.map(phone => (
                        <SwiperSlide key={phone.id}>
                            <ProductCard phone={phone} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="flex justify-center items-center flex-col mt-8">
                    <button className="btn btn-primary">voir plus</button>
                </div>
            </section>

            <section className="mt-12 p-4 space-y-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold font-poppins">Pourquoi choisir Myphone ?</h2>
                </div>

                <div className="flex flex-col gap-4 lg:grid grid-cols-3 lg:gap-4">
                    {features.map(items => (
                        <div key={items.id} className="card bg-[#e9f2f7d6] p-6 shadow-md flex justify-center items-center flex-col text-center">
                            <div>
                                <h2>
                                    {items.icon}
                                </h2>
                                <h2>
                                    {items.Legend}
                                </h2>
                                <p>
                                    {items.para}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <div className="flex flex-col md:flex-row items-center gap-10 bg-white rounded-3xl shadow-lg p-8 md:p-12">

                    {/* Image */}
                    <div className="md:w-1/2 flex justify-center">
                        <img
                            src="/src/assets/1215750_188.jpg"
                            alt="About Myphone"
                            className="w-full max-w-md rounded-2xl object-cover shadow-md hover:scale-105 transition duration-300"
                        />
                    </div>

                    {/* Content */}
                    <div className="md:w-1/2 space-y-5">
                        <h3 className="text-[blue] font-semibold uppercase tracking-wider">
                            À propos
                        </h3>

                        <h2 className="text-3xl md:text-4xl font-bold leading-tight text-gray-800">
                            Myphone,
                            <br />
                            <span className="text-[blue]">
                                Votre partenaire mobile de confiance
                            </span>
                        </h2>

                        <p className="text-gray-600 leading-relaxed">
                            Myphone est une entreprise spécialisée dans la vente de smartphones
                            et de solutions mobiles. Nous mettons un point d'honneur à offrir
                            des produits de qualité, authentiques et aux meilleurs prix.
                        </p>

                        <p className="text-gray-600 leading-relaxed">
                            Notre mission est de rendre la technologie accessible à tous et
                            d'accompagner nos clients au quotidien avec un service fiable et
                            personnalisé.
                        </p>
                    </div>
                </div>
            </section>

        </>
    )
}
export default Home;