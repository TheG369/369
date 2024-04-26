'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Solo importa useRouter una vez
import { obtenerProducto, actualizarProducto, obtenerCategoria} from '../../acciones/accionActualizar'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function editProduct({ params }) {
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
  });
  const [errores, setErrores] = useState({});
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const getData = async () => {
      console.log(params.id)
      const result = await obtenerProducto(params.id);
      console.log(result)
      setProduct(result.product);
      if (result.error) {
        alert(result.error.message);
      }
    };
    getData();
  }, [params.id]);


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4 text-white">Detalles del Album</h1>
      <div className="mb-4">
        <a href="/products" className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:border-gray-300">
          Regresar
        </a>
      </div>
    
    <div key={product.id}>
      <div className="bg-white dark:bg-gray-700 border border-gray-300 rounded-lg overflow-hidden shadow-md w-full sm:w-auto">
        <div className="relative">
          <img src={product.image} alt={product.name} className="w-full h-100 object-cover" />
          <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2">
            {product.name}
          </div>
        </div>
        <div className="p-4">
          <p className="text-gray-800 dark:text-gray-200">Price: {product.price}</p>
          <p className="text-gray-800 dark:text-gray-200">Description: {product.description}</p>
          <p className="text-gray-800 dark:text-gray-200">Category: {product.category}</p>
        </div>
      </div>
    </div>
    </div>
  );
}
