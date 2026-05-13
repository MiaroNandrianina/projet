import ProductCard from "../../components/Layouts/ProductCard";

function Home() {
    const fake = [
        { id: 1, Title: "Iphone 14 Pro", details: "Camera:48Mp Ram:128gb", prix: "2 500 000" },
        { id: 2, Title: "Nokia x6", details: "Camera:24Mp Ram:64gb", prix: "500 000" },
        { id: 3, Title: "Redmi 8 Pro", details: "Camera:48Mp Ram:128gb", prix: "1 500 000" },
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

                <div className="flex justify-center gap-6 items-center">
                    {fake.map(phone => (
                        <ProductCard key={phone.id} phone={phone} />
                    ))}
                </div>
            </section>

        </>
    )
}
export default Home;