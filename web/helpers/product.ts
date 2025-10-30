import { TProduct } from "@/models/model.product";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (err) {
    console.error("Request error:", err);
    throw err instanceof Error ? err : new Error("Unknown error");
  }
}

export async function fetchProducts(): Promise<TProduct[]> {
  return request<TProduct[]>(`${API_URL}/products`);
}

export async function fetchProductById(id: number): Promise<TProduct> {
  return request<TProduct>(`${API_URL}/products/${id}`);
}

export async function createProduct(
  payload: Omit<TProduct, "id">
): Promise<TProduct> {
  return request<TProduct>(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

export async function updateProduct(
  id: number,
  payload: Partial<Omit<TProduct, "id">>
): Promise<TProduct> {
  return request<TProduct>(`${API_URL}/products/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

export async function deleteProduct(id: number): Promise<TProduct> {
  return request<TProduct>(`${API_URL}/products/${id}`, {
    method: "DELETE",
  });
}
