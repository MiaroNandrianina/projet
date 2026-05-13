// import { useform } from "react-hook-form";
// import api from "../../services/api";
function Contact() {

    return (
        <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-10 p-8 bg-base-100 rounded-3xl shadow-xl">

            {/* Image */}
            <div className="md:w-1/2 flex justify-center">
                <img
                    src="/src/assets/sarycontact.png"
                    alt="Contact"
                    className="w-[80%] max-w-md drop-shadow-2xl"
                />
            </div>

            {/* Formulaire */}
            <div className="md:w-1/2 w-full">
                <div className="mb-6">
                    <h2 className="text-4xl font-bold text-primary">
                        Contact
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Envoyez-nous votre message et nous vous répondrons rapidement.
                    </p>
                </div>

                <form className="space-y-5">

                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">
                                Nom
                            </span>
                        </label>

                        <input
                            type="text"
                            placeholder="Votre nom"
                            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">
                                Email
                            </span>
                        </label>

                        <input
                            type="email"
                            placeholder="Votre email"
                            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">
                                Sujet
                            </span>
                        </label>

                        <input
                            type="text"
                            placeholder="Votre sujet"
                            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">
                                Message
                            </span>
                        </label>

                        <textarea
                            placeholder="Votre message..."
                            className="textarea textarea-bordered w-full h-32 focus:outline-none focus:ring-2 focus:ring-primary"
                        ></textarea>
                    </div>

                    <div className="pt-2">
                        <button className="btn btn-primary w-full text-white text-lg rounded-xl shadow-lg hover:scale-105 transition duration-300">
                            Envoyer
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}
export default Contact;