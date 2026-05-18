import { Link } from "react-router-dom";


function Footer() {
    return (
        <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10 no-print">

            <nav className="space-y-4">
                <h6 className="footer-title">SUIVEZ-NOUS</h6>
                <div className="flex items-center gap-2 hover:text-primary transition">
                    <i className="fa-brands fa-facebook text-xl"></i>

                    <a href="" target="_blank" rel="noreferrer" className="link link-hover">Facebook</a>
                </div>
                <div className="flex items-center gap-2 hover:text-green-500 transition">
                    <i className="fa-brands fa-whatsapp text-xl"></i>

                    <a href="" target="_blank" rel="noreferrer" className="link link-hover">Whatsapp</a>
                </div>
                <div className="flex items-center gap-2 hover:text-pink-500 transition">
                    <i className="fa-brands fa-instagram text-xl"></i>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="link link-hover">Instagram</a>
                </div>
            </nav>


            <nav className="space-y-4">
                <h6 className="footer-title">SERVICES</h6>
                <span className="text-gray-400 text-sm">Vente de téléphones</span>
                <span className="text-gray-400 text-sm">Accessoires d'origine</span>
                <span className="text-gray-400 text-sm">Service Après-Vente (SAV)</span>
                <span className="text-gray-400 text-sm">Livraison rapide</span>
            </nav>


            <nav className="space-y-4">
                <h6 className="footer-title">LIENS UTILES</h6>
                <Link to={"/"} className="link link-hover">Acceuil</Link>
                <Link to={"/liste-produits"} className="link link-hover">Produit</Link>
                {localStorage.getItem('token') ? (
                    <Link to="/profil" className="link link-hover">Informations personnelles</Link>
                ) : (
                    <Link to="/login" className="link link-hover">Informations personnelles</Link>
                )}
            </nav>


            <nav className="space-y-4">
                <h6 className="footer-title">NOTRE SOCIETE</h6>
                <span className="font-bold text-white">MyphoneMdsarl</span>
                <span className="text-gray-400 text-sm">Lot XXXXXXXX</span>
                <span className="text-gray-400 text-xs tracking-wider">STAT: 12354687/XXX</span>
            </nav>
        </footer>
    );
}

export default Footer;