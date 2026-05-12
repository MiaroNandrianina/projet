import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");
    
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    // Fonction alefa rehefa valide ny formulaire
    const onSubmit = async (data) => {
        setLoading(true);
        setApiError("");
        try {
            const response = await axios.post("http://localhost:8000/api/login", data);
            const { token, nom } = response.data;
            login(token, nom);
            navigate("/dashboard");
        } catch (err) {
            setApiError("Email na teny miafina diso. Andramo indray!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-base-200 p-4">
            <div className="flex w-full max-w-5xl bg-base-100 rounded-3xl shadow-2xl overflow-hidden min-h-[600px]">
                
                {/* LEFT SIDE: Decorative */}
                <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center p-12 relative">
                    <div className="relative z-10 text-center text-white">
                        <h1 className="text-5xl font-black mb-6 leading-tight text-white">MyPhone Space</h1>
                        <p className="text-lg opacity-80">Midira ato amin'ny tontolon'ny teknôlojia raitray indrindra.</p>
                    </div>
                </div>

                {/* RIGHT SIDE: Form */}
                <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center">
                    <h2 className="text-4xl font-black text-gray-800 mb-8">Connexion</h2>

                    {apiError && (
                        <div className="alert alert-error mb-6 rounded-xl text-white py-2 shadow-lg animate-shake">
                            <span className="text-sm font-bold">{apiError}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        
                        {/* EMAIL */}
                        <div className="form-control w-full">
                            <label className="label font-bold text-gray-700">Email Address</label>
                            <input 
                                type="email" 
                                placeholder="ohatra@gmail.com" 
                                className={`input input-bordered w-full h-14 rounded-2xl focus:input-primary transition-all text-black ${errors.email ? 'input-error' : ''}`}
                                {...register("email", { 
                                    required: "Tsy maintsy fenoina ny email",
                                    pattern: { value: /^\S+@\S+$/i, message: "Email tsy manan-kery" }
                                })}
                            />
                            {errors.email && <span className="text-error text-xs mt-1 font-bold">{errors.email.message}</span>}
                        </div>

                        {/* PASSWORD */}
                        <div className="form-control w-full">
                            <div className="flex justify-between items-center">
                                <label className="label font-bold text-gray-700">Teny miafina</label>
                                {/* <a href="#" className="text-xs text-primary font-bold hover:underline">Hadino?</a> */}
                            </div>
                            <input 
                                type="password" 
                                placeholder="********" 
                                className={`input input-bordered w-full h-14 rounded-2xl focus:input-primary transition-all text-black ${errors.password ? 'input-error' : ''}`}
                                {...register("password", { 
                                    required: "Tsy maintsy fenoina ny teny miafina",
                                    minLength: { value: 6, message: "Litera 6 raha kely indrindra" }
                                })}
                            />
                            {errors.password && <span className="text-error text-xs mt-1 font-bold">{errors.password.message}</span>}
                        </div>

                        {/* SUBMIT BUTTON */}
                        <button 
                            type="submit" 
                            className={`btn btn-primary w-full h-14 rounded-2xl text-white text-lg font-black shadow-lg shadow-primary/30 transition-all hover:-translate-y-1 ${loading ? 'loading' : ''}`}
                            disabled={loading}
                        >
                            {loading ? "Andraso kely..." : "HIDITRA"}
                        </button>
                    </form>

                    <p className="text-center mt-8 text-gray-500 font-medium">
                        Mbola tsy manana kaonty?  
                        <Link to="/Register" className="text-primary font-black ml-2 hover:underline">
                            REGISTER
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;