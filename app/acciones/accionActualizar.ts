'use server'
import { createClient } from '@/utils/supabase/client';


export async function obtenerProducto(id:number){
    const supabase = createClient();
    console.log(id)
    const { data,error } = await supabase
    .from('products')
    .select()
    .eq('id', id)
    .single();
    return{
        product:data,
        error,
    }
}

export async function actualizarProducto(id: number, product: {
  name: string;
  description: string;
  price: number;
  category: string;
}) {
  let errores: Record<string, string> = {};

  if (!product.name) {
    errores.nombre = 'El nombre del producto es requerido';
  }
  if (!product.description) {
    errores.descripcion = 'La descripción del producto es requerida';
  }
  if (product.price <= 0) {
    errores.precio = 'El precio del producto debe ser mayor que 0';
  }
  if (!product.price) {
    errores.precio = 'El precio es obligatorio';
  }
  if (isNaN(product.price)) {
    errores.precio = 'El precio debe ser un número';
  }
  if (!product.category) {
    errores.category = 'Debes elegir una categoría';
  }

  if (Object.keys(errores).length > 0) {
    return { success: false, errors: errores };
  } else {
    try {
      const supabase = createClient();

      const { data, error } = await supabase
        .from('products')
        .update(product)
        .eq('id', id);

      if (error) {
        console.error('Error updating product in database:', error.message);
        return { success: false, errors: { database: 'Error updating product in the database' } };
      }

      return { success: true, message: 'Product updated successfully', data: data };
    } catch (error) {
      console.error('Unexpected error:', error);
      return { success: false, errors: { unexpected: 'Unexpected error' } };
    }
  }
}
export async function obtenerCategoria(){
  const supabase = createClient();
  const { data,error } = await supabase.from('products').select('category');
  const uniqueCategories = Array.from(new Set(data?.map((item) => item.category)));
  return{
      categories: uniqueCategories,
      error,
  }
}