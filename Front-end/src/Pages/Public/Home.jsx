function Home() {
    return (
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
    )
}
export default Home;