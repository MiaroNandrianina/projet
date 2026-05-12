import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import api from "../../services/api";

const Register = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    

    const onSubmit = async (data) => {
        try {
            await api.post("/registration", data);

            alert("Tafiditra ny fisoratana anarana !");
        } catch (error) {
            console.error("Erreur  Symfony :", error.response?.data);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-100 via-white to-purple-100 flex items-center justify-center p-6">

            {/* Card principal */}
            <div className="w-full max-w-6xl bg-white rounded-[40px] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

                
                <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-violet-100 to-purple-50 p-12 relative">

            
                    <div className="absolute w-[500px] h-[500px] bg-purple-200 opacity-20 rounded-full"></div>

        
                    <img
                        src="/src/assets/10783825_19197394.jpg"
                        alt="Shopping"
                        className="w-full max-w-xl  object-contain z-10 drop-shadow-2xl"
                    />
                </div>

            
                <div className="flex items-center justify-center p-8 md:p-14">

                    <div className="w-full max-w-md">

                    
                        <div className="flex justify-center mb-5">
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-primary"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 8h14l-1 12H6L5 8zm3 0V6a4 4 0 118 0v2"
                                    />
                                </svg>
                            </div>
                        </div>

                        
                        <h2 className="text-4xl font-extrabold text-center text-gray-800">
                            Create Account
                        </h2>

                        <p className="text-center text-gray-500 mt-3 mb-10">
                            Join us and enjoy a better shopping experience.
                        </p>

                        
                        <form onSubmit={handleSubmit(onSubmit)}>

                        
                            <div className="mb-5">

                                <label className="block mb-2 text-sm font-semibold text-gray-700">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    className={`w-full h-14 px-5 rounded-2xl border bg-gray-50 outline-none transition-all duration-300 focus:border-primary focus:bg-white ${
                                        errors.nom
                                            ? "border-red-400"
                                            : "border-gray-200"
                                    }`}
                                    {...register("nom", {
                                        required: "Tsy maintsy fenoina ny nom",
                                    })}
                                />

                                {errors.nom && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {errors.nom.message}
                                    </p>
                                )}
                            </div>

                            
                            <div className="mb-5">

                                <label className="block mb-2 text-sm font-semibold text-gray-700">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    placeholder="example@gmail.com"
                                    className={`w-full h-14 px-5 rounded-2xl border bg-gray-50 outline-none transition-all duration-300 focus:border-primary focus:bg-white ${
                                        errors.email
                                            ? "border-red-400"
                                            : "border-gray-200"
                                    }`}
                                    {...register("email", {
                                        required: "Tsy maintsy fenoina ny email",
                                    })}
                                />

                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                        
                            <div className="mb-8">

                                <label className="block mb-2 text-sm font-semibold text-gray-700">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className={`w-full h-14 px-5 rounded-2xl border bg-gray-50 outline-none transition-all duration-300 focus:border-primary focus:bg-white ${
                                        errors.password
                                            ? "border-red-400"
                                            : "border-gray-200"
                                    }`}
                                    {...register("password", {
                                        required: "Tsy maintsy misy password",
                                        minLength: {
                                            value: 6,
                                            message:
                                                "Mila litera 6 farafahakeliny",
                                        },
                                    })}
                                />

                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                
                            <button
                                type="submit"
                                className="w-full h-14 rounded-2xl bg-primary text-white text-lg font-semibold hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-primary/30"
                            >
                                Register
                            </button>

                    
                            <p className="text-center text-gray-500 mt-6">
                                Already have an account ?{" "}
                                <Link to="/Login" className="text-primary font-semibold cursor-pointer hover:underline">
                                    Sign in
                                </Link>
                            </p>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;