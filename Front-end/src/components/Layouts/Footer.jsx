function Footer() {
    return (
        <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
            <nav>
                <h6 className="footer-title">SUIVEZ NOUS</h6>
                <div>
                    <i className="fa-brands fa-facebook-f text-2xl"></i>
                    <a className="link link-hover">Facebook</a>
                </div>
                <div>
                    <i className="fa-brands fa-whatsapp text-2xl"></i>
                    <a className="link link-hover">Whatsapp</a>
                </div>
                <div>
                    <i className="fa-brands fa-instagram text-2xl"></i>
                    <a className="link link-hover">Instagram</a>
                </div>
               
            </nav>
            <nav>
                <h6 className="footer-title">SERVICES</h6>
                <a className="link link-hover">Branding</a>
                <a className="link link-hover">Design</a>
                <a className="link link-hover">Marketing</a>
                <a className="link link-hover">Advertisement</a>
            </nav>
            <nav>
                <h6 className="footer-title">COMPANY</h6>
                <a className="link link-hover">Home</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Information personnelles</a>
            </nav>
            <nav>
                <h6 className="footer-title">NOTRE SOCIETE</h6>
                <a className="link link-hover">Mydirthph SARL</a>
                <a className="link link-hover">Lot XXXXXXXX</a>
                <a className="link link-hover">N:12354687/</a>
            </nav>
        </footer>
    )
}
export default Footer;