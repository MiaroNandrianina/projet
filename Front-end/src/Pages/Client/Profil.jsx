import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Context/AuthContext';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Profil = () => {
    const { user, logout } = useContext(AuthContext);
    const [status, setStatus] = useState({ type: '', msg: '' });
    const Navigate = useNavigate();

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
                setTimeout(() => {
                    logout();
                    Navigate('/');
                }, 2000);
                // Azonao atao ny manao refresh ny UserContext eto raha ilaina
            }
        } catch (error) {
            setStatus({ type: 'error', msg: 'erreur \' changement.' });
        }
    };

    // Function suppression compte..................//
    const handleDelete = async () => {
        setStatus({ type: '', msg: '' });
        try {
            const reponse = await api.delete('/profile/delete');

            if (reponse.status === 200 || reponse.data.status === 'success') {
                setStatus({ type: 'success', msg: 'Compte supprimé avec succès !' });

                setTimeout(() => {
                    logout();
                    Navigate('/');
                }, 2000);
            }
        } catch (error) {
            setStatus({ type: 'error', msg: 'Erreur lors de la suppression.' });
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

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" id='clientForm'>
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
                </form>

                <div className="flex items-center gap-2 pt-4 mt-8">
                    <button
                        type="submit"
                        form='clientForm'
                        disabled={isSubmitting}
                        className={`btn btn-primary  rounded-2xl text-white font-bold border-none ${isSubmitting ? 'loading' : ''}`}
                        style={{ backgroundColor: '#4F46E5' }}
                    >
                        {isSubmitting ? 'en attente...' : 'enregistrer'}
                    </button>
                    <div>
                        <button className="btn rounded-2xl text-red-600" onClick={() => document.getElementById('my_modal_1').showModal()}>Supprimer votre compte</button>
                        <dialog id="my_modal_1" className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg text-red-500 text-center"><i class="fa-solid fa-circle-exclamation text-red-500 text-3xl"></i></h3>
                                <p className="py-4 text-center">Votre compte va-t-il vraiment être supprimé ?</p>
                                <div className="modal-action">
                                    <button className='btn text-red-600' type='button' onClick={handleDelete}>Oui</button>

                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn">Non</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>



            </div>
        </div>
    );
};

export default Profil;