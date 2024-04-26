'use server'
import { createClient } from '@/utils/supabase/server';
import { cookies } from "next/headers";

export async function obtenerProductos(){
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
    const { data,error } = await supabase.from('products').select();
    
    return{
        products: data,
        error,
    }
}

export async function searchProducts(search:string,selectedCategory:string){
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
    if (!selectedCategory) {
      const { data,error } = await supabase.from('products').select().like('name', `%${search}%`);
      return{
        products:data,
        error,
      }
    } else if (!search.trim() && !selectedCategory) {
      const { data,error } = await supabase.from('products').select();
      return{
        products:data,
        error,
      }
    } else if (!search.trim() && selectedCategory) {
      const { data,error } = await supabase.from('products').select().eq('category', selectedCategory);
      return{
        products:data,
        error,
      }
    } else {
      const { data,error } = await supabase
        .from('products')
        .select()
        .like('name', `${search}`)
        .eq('category', selectedCategory);
        return{
            products:data,
            error,
          }
    }
}