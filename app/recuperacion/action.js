"use server"

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function saveNewPassword(password) {
    const cookiesStore = cookies();
    const supabase = createClient(cookiesStore);

    // Validar contraseña en el servidor
    
    const { data, error } = await supabase.auth.updateUser({ password: password });

    if (error) {
        return {
            success: false,
            message: `No se puede guardar la nueva contraseña: ${error.message}`,
            errors: null,
        };
    }

    return {
        success: true,
        message: "La contraseña ha sido actualizada.",
        errors: null,
    };
}