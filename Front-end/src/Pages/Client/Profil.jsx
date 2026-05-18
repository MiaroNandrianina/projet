import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Context/AuthContext';
import api from '../../services/api';

const Profil = () => {
    const { user } = useContext(AuthContext);
    const [status, setStatus] = useState({ type: '', msg: '' });

    // 1. Fampiasana useForm miaraka amin'ny defaultValues avy amin'ny User connecte
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            nom: user?.username || "",
            email: user?.email || "",
            telephone: user?.telephone || "",
            adresse: user?.adresse || ""
        }
    });

    // 2. Function fandefasana ny data any amin'ny Symfony
    const onSubmit = async (data) => {
        setStatus({ type: '', msg: '' });
        try {
            const response = await api.put('/profile/update', data);
            if (response.data.status === 'success') {
                setStatus({ type: 'success', msg: 'votre changement enregistrer!' });
                // Azonao atao ny manao refresh ny UserContext eto raha ilaina
            }
        } catch (error) {
            setStatus({ type: 'error', msg: 'erreur \' changement.' });
        }
    };

    return (
        <div className="p-4 md:p-8">
            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-2xl font-black">
                        {user?.username?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-gray-800">Mon Profil</h1>
                        <p className="text-gray-500 text-sm">Parametrer vos profile</p>
                    </div>
                </div>

                {status.msg && (
                    <div className={`p-4 mb-6 rounded-2xl text-white font-bold ${status.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                        {status.msg}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                        <div className="form-control">
                            <label className="label font-bold text-gray-700">nom</label>
                            <input 
                                type="text"
                                {...register("nom", { required: "remplir toutes les champ" })}
                                className="input input-bordered rounded-2xl bg-gray-50 focus:bg-white border-gray-200"
                            />
                            {errors.nom && <span className="text-red-500 text-xs mt-1">{errors.nom.message}</span>}
                        </div>

    
                        <div className="form-control">
                            <label className="label font-bold text-gray-700">Email</label>
                            <input 
                                type="email"
                                {...register("email", { required: "besoin email" })}
                                className="input input-bordered rounded-2xl bg-gray-50 focus:bg-white border-gray-200"
                            />
                            {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                        <div className="form-control">
                            <label className="label font-bold text-gray-700">telephone</label>
                            <input 
                                type="text"
                                {...register("telephone")}
                                placeholder="034 00 000 00"
                                className="input input-bordered rounded-2xl bg-gray-50 focus:bg-white border-gray-200"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label font-bold text-gray-700">Adresse (Livraison)</label>
                            <input 
                                type="text"
                                {...register("adresse")}
                                placeholder="Lot..."
                                className="input input-bordered rounded-2xl bg-gray-50 focus:bg-white border-gray-200"
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className={`btn btn-primary w-full rounded-2xl text-white font-bold border-none ${isSubmitting ? 'loading' : ''}`}
                            style={{ backgroundColor: '#4F46E5' }} // Loko indigo mitovy amin'ny Sidebar-nao
                        >
                            {isSubmitting ? 'en attente...' : 'enregistrer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profil;