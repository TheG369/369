'use server'
import { createClient } from '@/utils/supabase/client';

export async function createProduct(product:{
nombre: string,
descripcion: string,
precio: number,
category: string,}) 
{
    let errores: Record<string, string> = {};
    if (!product.nombre) {
        errores.nombre = 'Este campo es obligatorio';
      }
      if (!product.descripcion) {
        errores.descripcion = 'Este campo es obligatorio';
      }
      if (product.precio <= 0) {
        errores.precio = 'Este campo es obligatorio';
      }
      if(!product.precio){
        errores.precio = 'Este campo es obligatorio';   
      }
      if(isNaN(product.precio)){
          errores.precio = 'Este campo es obligatorio';
      }
      if (!product.category) {
          errores.category = 'Este campo es obligatorio';
        }
        if (Object.keys(errores).length > 0) {
            return { success: false,errors: errores };
          }else{
            try {
                const supabase = createClient();
                const newProduct = {
                    name:product.nombre,
                    price: product.precio,
                    description: product.descripcion,
                    category: product.category
                }
                const { data, error } = await supabase.from('products').insert([newProduct]);
                if (error) {
                  console.error('Error adding product to database:', error.message);
                  return { success: false, errors: { database: 'Error adding product to database' } };
                }
                return { success: true, message: 'Product created successfully', data: data };
              } catch (error) {
                console.error('Unexpected error:', error);
                return { success: false, errors: { unexpected: 'Unexpected error' } };
              }
          }
        }