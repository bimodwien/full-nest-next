"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { updateProduct, fetchProductById } from "@/helpers/product";
import { useRouter, useParams } from "next/navigation";
import { TProduct } from "@/models/model.product";

const EditProduct = () => {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState<TProduct | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      const data = await fetchProductById(Number(params.id));
      setProduct(data);
    };
    loadProduct();
  }, [params.id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const product = {
      name: formData.get("name") as string,
      price: Number(formData.get("price")),
      stock: Number(formData.get("stock")),
      description: formData.get("description") as string,
    };
    const data = await updateProduct(Number(params.id), product);
    alert("Product updated successfully");
    router.push("/");
  };

  return (
    <div className="max-w-7xl px-4 py-5 mx-auto">
      <h1 className="mb-5 font-medium">Edit Product Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-medium" htmlFor="name">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={product?.name}
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
            defaultValue={product?.price}
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
            defaultValue={product?.stock}
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
            defaultValue={product?.description}
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

export default EditProduct;
