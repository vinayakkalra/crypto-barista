import { useCanister } from "@connect2ic/react";

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch('/products/' + id);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchCategories() {
  const [backend] = useCanister("backend");

  return new Promise(async (resolve) => {
    const response = await backend.listCategories();
    //console.log(response);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllProducts() {
  const [backend] = useCanister("backend");

  return new Promise(async (resolve) => {
    const response = await backend.listProducts();
    console.log(response);
    const data = await response.json();
    resolve({ data });
  });
}