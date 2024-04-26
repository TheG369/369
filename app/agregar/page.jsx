'use client'
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { createProduct } from '../server/createProduct';
import { useRouter } from 'next/navigation';


export default function addProduct(){
  const router = useRouter();
  const supabase = createClient();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await supabase.from('products').select('category', { distinct: true });
        const uniqueCategories = Array.from(new Set(data.map((item) => item.category)));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching categories:', error.message);
      }
    };
    getCategories();
  }, []);
  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: 0,
    category: '',
  });
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createProduct(producto);
      if (result.success) {
        setProducto({
          nombre: '',
          descripcion: '',
          precio: 0,
          category: '',
        });
        setErrores({});
        router.push('/products');
      } else {
        setErrores(result.errors);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAddProduct = () => {
    router.push('/products');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4 text-gray-800">Agregar Disco</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="relative z-0 w-full md:w-1/2 px-3 mb-6 md:mb-0 group">
            <input className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" id="grid-first-name" type="text" placeholder="Nombre del Disco" name="nombre" value={producto.nombre} onChange={handleChange} />
            <label htmlFor="grid-first-name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre</label>
            {errores.nombre && <p className="text-red-500 text-xs italic">Por favor, completa este campo.</p>}
          </div>
          <div className="relative z-0 w-full md:w-1/2 px-3 group">
            <textarea className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" id="grid-last-name" placeholder="Descripcion del Disco" name="descripcion" value={producto.descripcion} onChange={handleChange}></textarea>
            <label htmlFor="grid-last-name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Descripción</label>
            {errores.descripcion && <p className="text-red-500 text-xs italic">Por favor, completa este campo.</p>}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="relative z-0 w-full md:w-1/2 px-3 mb-6 md:mb-0 group">
            <input className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" id="grid-password" type="number" placeholder="0" name="precio" value={producto.precio} onChange={handleChange} />
            <label htmlFor="grid-password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Precio</label>
            {errores.precio && <p className="text-red-500 text-xs italic">Por favor, completa este campo con un número válido.</p>}
          </div>
          <div className="relative z-0 w-full md:w-1/2 px-3 mb-6 md:mb-0 group">
            <select className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" id="grid-state" name="category" value={producto.category} onChange={handleChange}>
              <option value="">Selecciona una categoría</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <label htmlFor="grid-state" className="peer-focus:font-medium absolute text-sm text-black-500 dark:text-black-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Categoría</label>
            {errores.category && <p className="text-red-500 text-xs italic">Por favor, selecciona una categoría.</p>}
          </div>
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Guardar Disco</button>
      </form>
      <button onClick={handleAddProduct} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:border-gray-300">
        Volver
      </button>
    </div>
  );
 }  