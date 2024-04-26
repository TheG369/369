      'use client'

       import { useEffect, useState } from "react";
       import { saveNewPassword } from './action'
       import { useRouter } from 'next/navigation';
       import { createClient } from '@/utils/supabase/client';
       
       export default function changePassword() {
           const [password, setPassword] = useState('');
           const [confirmPwd, setConfirmPwd] = useState('');
           const [errors, setErrors] = useState({});
           const supabase = createClient();
           const router = useRouter();
       
       
       
           function previousPage() {
               router.back();
           }
       
           function handleChangePassword(event) {
               event.preventDefault();
       
               let errorList = {};
       
               if (!password) {
                   errorList.password = "La contraseña es obligatoria";
               } else if (password.length < 6) {
                   errorList.password = "La contraseña debe tener al menos 6 caracteres";
               }
       
               if (!confirmPwd) {
                   errorList.confirmPwd = "Este campo es obligatorio";
               } else if (confirmPwd !== password) {
                   errorList.confirmPwd = "Las contraseñas no coinciden";
               }
       
               if (Object.keys(errorList).length > 0) {
                   setErrors(errorList);
                   return;
               }
       
               saveNewPassword(password)
                   .then((result) => {
                       console.log(result);
                       alert(result.message);
                        // Vaciar campos
                       setPassword('');
                       setConfirmPwd('');
                       // Redireccionar a /products
                       router.push('/products');
                   })
                   .catch((error) => {
                       console.error(error);
                       alert(error.message);
                   });
           }
       
           return (
               <div className="w-full">
                   <div className="mt-4 ml-4">
                       <button className="btn bg-gray-500 p-2 text-lg border rounded-lg bg-sky-500 rounded-lg shadow-lg" onClick={previousPage}>
                           <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                               <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13" />
                           </svg>
                       </button>
                   </div>
       
                   <form className="flex flex-col gap-4 mt-8 max-w-xs mx-auto p-6 bg-gray-400 rounded-lg shadow-lg" onSubmit={handleChangePassword}>
                       <h3 className="text-lg font-medium text-gray-900 text-center">Cambiar password</h3>
                       <div className="flex flex-col">
                           <label className="text-gray-700">Password</label>
                           <input
                               type="password"
                               name="password"
                               placeholder="Nueva contraseña"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               className="input text-black border border-gray-300 py-3 px-4 rounded-lg focus-border-indigo-500 outline-none focus:ring-1 focus:ring-indigo-500"
                           />
                           {errors.password && <span className="text-red-500">{errors.password}</span>}
                       </div>
       
                       <div className="flex flex-col">
                           <label className="text-black">Confirmar</label>
                           <input
                               type="password"
                               name="confirmPwd"
                               placeholder="Confirmar contraseña"
                               value={confirmPwd}
                               onChange={(e) => setConfirmPwd(e.target.value)}
                               className="input text-black border border-gray-300 py-3 px-4 rounded-lg focus-border-indigo-500 outline-none focus:ring-1 focus:ring-indigo-500"
                           />
                           {errors.confirmPwd && <span className="text-red-500">{errors.confirmPwd}</span>}
                       </div>
       
                       <button type="submit" className="btn inline-block bg-gray-200 p-2 text-lg border rounded-lg bg-gray-500 rounded-lg shadow-lg max-w-max mx-auto">Cambiar mi contraseña</button>
                   </form>
               </div>
           );
       }