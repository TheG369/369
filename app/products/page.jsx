'use client'

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { searchProducts, obtenerProductos } from '../accion/accion'
import { obtenerCategoria } from '../acciones/accionActualizar';
import Slider from 'react-slick';


export default function Page() {
  const [products, setProducts] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  //const [theme, setTheme] = useState('dark'); // Cambiado a oscuro por defecto
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const result = await obtenerProductos();
      setProducts(result.products || []);
      if (result.error) {
        alert(result.error.message)
      }
    }
    getData();
  }, []);

  useEffect(() => {
    const obtener = async () => {
      const result = await obtenerCategoria();
      setCategories(result.categories || []);
      if (result.error) {
        alert(result.error.message);
      }
    };
    obtener();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const result = await searchProducts(search, selectedCategory)
    setProducts(result.products || []);
    if (result.error) {
      alert(result.error.message)
    }
  };

  const handleCategoryChange = async (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    const result = await searchProducts(search, category)
    setProducts(result.products || []);
    if (result.error) {
      alert(result.error.message)
    }
  };

  const handleAddProduct = () => {
    router.push('/agregar');
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 3, // Modifica según tus necesidades
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000, // Cambiado a 8000 para que cambie cada 8 segundos
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }
    ]
};


  return (
    <div className={`container mx-auto p-4  bg-gray-900`}>
      <form className="pb-4 bg-white dark:bg-gray-900" onSubmit={handleSearch}>
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative mt-10 flex items-center">
          <input
            type="text"
            id="table-search"
            className="block pt-2 ps-3 pb-2.5 text-sm text-gray-900 border border-gray-300 rounded-md w-60 sm:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Buscar Album"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="ml-2 flex items-center">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
        </div>
        <div className="mt-2">
          <select
            name="category"
            id="category"
            className="block w-60 sm:w-80 border border-blue-500 rounded-md bg-gray-200 focus:ring-white focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-sans text-gray-800 ml-0 mt-2 sm:mt-0"
            onChange={handleCategoryChange}
            value={selectedCategory}
          >
            <option value="">Seleccionar Categoria</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </form>
      <Slider {...settings}>
  {products?.map((product) => (
    <div key={product.id}>
      <div className="bg-white dark:bg-gray-700 border border-gray-300 rounded-lg overflow-hidden shadow-md w-full sm:w-auto">
        <div className="relative">
          <img src={product.image} alt={product.name} className="w-full h-100 object-cover" />
          <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2">
            {product.name}
          </div>
        </div>
        <div className="p-4">
         
          <a href={`/editar/${product.id}`} className="text-blue-500 hover:underline">Editar</a>
          <a href={`/detalles/${product.id}`} className="text-blue-500 hover:underline text-right">Detalles</a>
        </div>
      </div>
    </div>
  ))}
</Slider>

      <div className="flex justify-end mt-4">
        <button
          onClick={handleAddProduct}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Agregar Disco
        </button>
      </div>
    </div>
  );
}
