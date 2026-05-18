import { useForm } from "react-hook-form";
import api from "../../services/api";
function Contact() {

    const { register:contact, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        try {
            await api.post("/contact", data);
            alert("message success");
            reset();
        } catch (error) {
            console.error("erreur message:", error.reponse?.data);
        }
    }
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

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">
                                Nom
                            </span>
                        </label>

                        <input
                            type="text"
                            placeholder="Votre nom"
                            className={`input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary ${errors.nom
                                ? "border-red-400"
                                : "border-gray-200"}`}
                            {...contact("nom", { required: "remplir tous les champ" })}
                        />

                        {errors.nom && (
                            <p className="text-red-500 text-sm mt-2">
                                {errors.nom.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">
                                tel
                            </span>
                        </label>

                        <input
                            type="text"
                            placeholder="03254879"
                            className={`input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary ${errors.tel
                                ? "border-red-400"
                                : "border-gray-200"}`}
                            {...contact("tel", { required: "remplir tous les champ" })}
                        />

                        {errors.tel && (
                            <p className="text-red-500 text-sm mt-2">
                                {errors.tel.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">
                                Email
                            </span>
                        </label>

                        <input
                            type="email"
                            placeholder="xxxx@gmail.com"
                            className={`input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary ${errors.email
                                ? "border-red-400"
                                : "border-gray-200"}`}
                            {...contact("email", { required: "remplir tous les champ" })}
                        />

                        {errors.email && (
                            <p className="text-red-500 text-sm mt-2">
                                {errors.email.message}
                            </p>
                        )}
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
                            className={`input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary ${errors.sujet
                                ? "border-red-400"
                                : "border-gray-200"}`}
                            {...contact("sujet", { required: "remplir tous les champ" })}
                        />

                        {errors.sujet && (
                            <p className="text-red-500 text-sm mt-2">
                                {errors.sujet.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">
                                Message
                            </span>
                        </label>

                        <textarea
                            placeholder="Votre message..."
                            className={`textarea textarea-bordered w-full h-32 focus:outline-none focus:ring-2 focus:ring-primary ${errors.message ? "border-red-400" : "border-gray-200"}`}
                            {...contact("message", { required: "remplir tous les champ" })}
                        ></textarea>

                        {errors.message && (
                            <p className="text-red-500 text-sm mt-2">
                                {errors.message.message}
                            </p>
                        )}
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