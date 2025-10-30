"use client";
import React, { useState, useEffect } from "react";
import { fetchProducts } from "@/helpers/product";
import { TProduct } from "@/models/model.product";
import Link from "next/link";
import { deleteProduct } from "@/helpers/product";

const ProductTable = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const perpage = 8;

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / perpage);
  const paginationProducts = filteredProducts.slice(
    (page - 1) * perpage,
    page * perpage
  );

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    setProducts(products.filter((product) => product.id !== id));
    alert("Product deleted successfully");
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium mb-4">Product List</h2>
        <input
          type="text"
          placeholder="Search Product..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          className="border px-2 py-1 mb-4 w-full max-w-sm rounded"
        />
      </div>
      <table className="min-w-full border border-black border-collapse table-fixed">
        <colgroup>
          <col className="w-14" />
          <col className="w-64" />
          <col className="w-28" />
          <col />
          <col className="w-44" />
        </colgroup>
        <thead>
          <tr className="bg-gray-100">
            <th className="border-b p-2 text-left">ID</th>
            <th className="border-b p-2 text-left">Name</th>
            <th className="border-b p-2 text-left">Price</th>
            <th className="border-b p-2 text-left">Description</th>
            <th className="border-b p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginationProducts.map((product) => (
            <tr key={product.id}>
              <td className="border-b p-2">{product.id}</td>
              <td className="border-b p-2">{product.name}</td>
              <td className="border-b p-2">{product.price}</td>
              <td className="border-b p-2 max-w-[600px] overflow-hidden text-ellipsis whitespace-nowrap">
                {product.description}
              </td>
              <td className="border-b p-2 whitespace-nowrap">
                <div className="inline-flex gap-2 items-center">
                  <Link
                    href={`/edit-product/${product.id}`}
                    className="border border-black px-3 py-1 rounded hover:bg-gray-400 hover:text-white transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="border border-black px-3 py-1 rounded hover:bg-red-500 hover:text-white transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center py-4 gap-4 justify-between">
        <Link
          href="/add-product"
          className="border border-black px-3 py-1 rounded hover:bg-black hover:text-white transition-colors"
        >
          Add Product
        </Link>
        <div className="flex items-center gap-4">
          <span>
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-3">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="border px-2 py-1 rounded disabled:opacity-50 cursor-pointer"
            >
              Prev
            </button>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="border px-2 py-1 rounded disabled:opacity-50 cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
