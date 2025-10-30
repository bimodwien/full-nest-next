"use client";
import React, { useState, useEffect } from "react";
import { fetchProducts } from "@/helpers/product";
import { TProduct } from "@/models/model.product";

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
      <table className="min-w-full border border-black">
        <thead>
          <tr className="bg-gray-100">
            <th className="border-b p-2 text-left">ID</th>
            <th className="border-b p-2 text-left">Name</th>
            <th className="border-b p-2 text-left">Price</th>
          </tr>
        </thead>
        <tbody>
          {paginationProducts.map((product) => (
            <tr key={product.id}>
              <td className="border-b p-2">{product.id}</td>
              <td className="border-b p-2">{product.name}</td>
              <td className="border-b p-2">{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center py-5 gap-4 justify-end">
        <span>
          Page {page} of {totalPages}
        </span>
        <div className="flex gap-3">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="border px-2 py-1 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="border px-2 py-1 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
