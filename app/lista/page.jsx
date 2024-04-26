'use client'
import { useEffect, useState } from 'react';

export default function Page() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getData = async() =>{
      const result = await productsList();
      setProducts(result.products || []);
      if (result.error) {
        alert(result.error.message)
      }
    }
    getData();
  }, []);

  useEffect(() => {
    const GetCategories = async () => {
      const result = await getCategories();
      setCategories(result.categories || []);
      if (result.error) {
        alert(result.error.message)
      }
    };
    GetCategories();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const result = await searchProducts(search,selectedCategory)
    setProducts(result.products || []);
    if (result.error) {
      alert(result.error.message)
    }
  };

const handleCategoryChange = async (e) => {
  const category = e.target.value;
  setSelectedCategory(category);
  const result = await searchProducts(search,category)
  setProducts(result.products || []);
  if (result.error) {
    alert(result.error.message)
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form className="pb-4 bg-white dark:bg-gray-900" onSubmit={handleSearch}>
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative mt-1">
          <input
            type="text"
            id="table-search"
            className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for items"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="absolute inset-y-0 left-0 flex items-center pl-3">
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
        <div className='mt-4 mb-4'>
            <a href="/pages/addProduct" className="px-4 py-2 text-white bg-blue-500 rounded-lg">Add Product</a>
        </div>
        <div className="mt-2">
          <select
            name="category"
            id="category"
            className="block w-full border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleCategoryChange}
            value={selectedCategory}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </form>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4">{product.id}</td>
              <td className="px-6 py-4">{product.name}</td>
              <td className="px-6 py-4">{product.price}</td>
              <td className="px-6 py-4">{product.description}</td>
              <td className="px-6 py-4">{product.amount}</td>
              <td className="px-6 py-4">{product.category}</td>
              <td className="px-6 py-4">
                  <a className="text-blue-500" href={/pages/edit/`${product.id}`}>Edit</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}