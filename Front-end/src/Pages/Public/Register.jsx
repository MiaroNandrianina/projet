import { useForm } from "react-hook-form";
import api from "../../services/api"; 

const Register = () => {
    // register: mampifandray ny input amin'ny hook form
    // handleSubmit: miantso ny function-ntsika rehefa tsy misy erreur ny validation
    // errors: eto no hipetraka ny hafatra raha misy diso (validation)
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await api.post("/registration", data); 
            alert("Tafiditra ny fisoratana anarana!");
        } catch (error) {
            console.error("Erreur avy amin'ny Symfony:", error.response?.data);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh]">
            <div className="card w-96 bg-base-100 shadow-xl border border-gray-200">
                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="card-title text-2xl font-bold justify-center mb-4">Register</h2>
                    
                    {/* Input nom */}
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Nom</span></label>
                        <input 
                            type="text" 
                            className={`input input-bordered ${errors.nom ? 'input-error' : ''}`}
                            {...register("nom", { required: "Tsy maintsy fenoina ny email" })} 
                        />
                        {errors.nom && <span className="text-error text-xs mt-1">{errors.nom.message}</span>}
                    </div>
                    {/* Input Email */}
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Email</span></label>
                        <input 
                            type="email" className={`input input-bordered ${errors.email ? 'input-error' : ''}`} {...register("email", { required: "Tsy maintsy fenoina ny email" })} 
                        />
                        {errors.email && <span className="text-error text-xs mt-1">{errors.email.message}</span>}
                    </div>

                    {/* Input Password */}
                    <div className="form-control mt-2">
                        <label className="label"><span className="label-text font-semibold">Password</span></label>
                        <input 
                            type="password" 
                            className={`input input-bordered ${errors.password ? 'input-error' : ''}`}
                            {...register("password", { 
                                required: "Tsy maintsy misy password",
                                minLength: { value: 6, message: "Mila litera 6 farafahakeliny" }
                            })} 
                        />
                        {errors.password && <span className="text-error text-xs mt-1">{errors.password.message}</span>}
                    </div>

                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary text-white">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;