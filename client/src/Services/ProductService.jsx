import axios from "axios"

// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";
// console.log("URL: ", BACKEND_URL);


// Fetch all the categories
export const fetchAllCategories = async () => {
    try {
        const response = await axios.get("http://localhost:8080/category/categories");
        console.log("Response fron the fetchAllCategory: ", response.data.category);
        return response.data.category;
    } catch (error) {
        console.log(error,message);
    }
}

// fetch all products

export const fetchAllProducts = async () => {
    try {
        const response = await axios.get("http://localhost:8080/products");
        console.log(response);
        return response.data.products;
    } catch (error) {
        console.log(`Error fetching products: `, error);
    }
};

export const createProduct = async (productData) => {
    try {
        const response = await axios.post("http://localhost:8080/products", productData);
        console.log("RESPONSE: ", response);
        return response.data.product;
    } catch (error) {
        console.log("Error while creating product: ", error);
        throw error;
    }
};

export const updateProduct = async (productId, data) => {
    try {
        const response = await axios.put(`http://localhost:8080/products/${productId}`, data);
        if (response.data.success) {
            return response.data.updatedProduct;
        }
        throw new Error(response.data.message || "Update failed");
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
};

export const deleteProduct = async (productId) => {
    try {
        await axios.delete(`http://localhost:8080/products/${productId}`);
    } catch (error) {
        console.log("Error deleting product: ", error);
    }
}
