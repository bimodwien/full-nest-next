"use client";
import React from "react";
import { createProduct } from "@/helpers/product";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AddProduct = () => {
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const product = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      stock: Number(formData.get("stock")),
    };
    const data = await createProduct(product);
    alert("Product created successfully");
    router.push("/");
  };
  return (
    <div className="max-w-7xl px-4 py-5 mx-auto">
      <h1 className="mb-5 font-medium">Add Product Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-medium" htmlFor="name">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-1/2 p-2 border border-gray-500- rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium" htmlFor="price">
            Product Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className="w-1/2 p-2 border border-gray-500 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium" htmlFor="stock">
            Product Stock
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            className="w-1/2 p-2 border border-gray-500 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium" htmlFor="description">
            Product Description
          </label>
          <textarea
            id="description"
            name="description"
            className="w-1/2 p-2 border border-gray-500 rounded"
          ></textarea>
        </div>
        <div className="flex gap-3 items-center">
          <button className="border border-black px-4 py-1 rounded bg-black text-white hover:opacity-90 transition-colors mt-4 text-lg cursor-pointer">
            Submit
          </button>
          <Link
            href="/"
            className="border border-black px-4 py-1 rounded mt-4 text-lg font-medium cursor-pointer hover:opacity-90 transition-colors"
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
