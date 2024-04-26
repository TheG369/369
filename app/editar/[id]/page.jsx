'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { obtenerProducto, actualizarProducto, obtenerCategoria} from '../../acciones/accionActualizar'


export default function editProduct({ params }) {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
  });
  const [errores, setErrores] = useState({});

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


  useEffect(() => {
    const getData = async () => {
      const result = await obtenerProducto(params.id);
      console.log(result)
      setProduct(result.product);
      if (result.error) {
        alert(result.error.message);
      }
    };
    getData();
  }, [params.id]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await actualizarProducto(params.id,product);
      if (result.success) {
        setProduct({
          name: '',
          description: '',
          price: 0,
          category: '',
        });
        setErrores({});
        router.push('/products');
      } else {
        setErrores(result.errors);
      }
    } catch (error) {
      console.log(error.message)
    }
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4 text-white">Editar Producto</h1>
      <div className="mb-4">
        <a href="/products" className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:border-gray-300">
          Regresar
        </a>
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
              Nombre:
            </label>
            <input
              id="name"
              name="name"
              value={product?.name}
              onChange={handleChange}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              autoComplete="off"
            />
            {errores.nombre && <p className="text-red-500 text-xs italic mt-1">{errores.nombre}</p>}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
              Descripción:
            </label>
            <textarea
              id="description"
              name="description"
              value={product?.description}
              onChange={handleChange}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            />
            {errores.descripcion && <p className="text-red-500 text-xs italic mt-1">{errores.descripcion}</p>}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="price">
              Precio:
            </label>
            <input
              id="price"
              name="price"
              value={product?.price}
              onChange={handleChange}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            />
            {errores.precio && <p className="text-red-500 text-xs italic mt-1">{errores.precio}</p>}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="category">
              Categoría:
            </label>
            <select
              name="category"
              id="category"
              className="block w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white"
              onChange={handleChange}
              value={product?.category}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errores.category && <p className="text-red-500 text-xs italic mt-1">{errores.category}</p>}
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Guardar Producto
        </button>
      </form>
    </div>
  );
}