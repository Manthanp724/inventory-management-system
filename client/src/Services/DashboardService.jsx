import axios from "axios"

// const API = "http://localhost:5173/sales";

export const fetchTotalSales = async () => {
    try {
      const response = await axios.get("http://localhost:8080/sales/total");
      // Your API returns array with one object, so we take first element
      console.log("Fetch Total Sales : ", response);
      
      return response.data.totalSales[0] || { totalRevenue: 0, totalOrders: 0 };
    } catch (error) {
      console.error('Error fetching total sales:', error);
      return { totalRevenue: 0, totalOrders: 0 };
    }
  };
  
  export const fetchDailySales = async () => {
    try {
      const response = await axios.get("http://localhost:8080/sales/daily");
      console.log("Fetch Daily Sales : ", response);
      return response.data.dailySales || [];
    } catch (error) {
      console.error('Error fetching daily sales:', error);
      return [];
    }
  };
  
  export const fetchMonthlySales = async () => {
    try {
      const response = await axios.get("http://localhost:8080/sales/monthly");
      console.log("Fetch Monthly Sales : ", response);

      return response.data.monthlySales || [];
    } catch (error) {
      console.error('Error fetching monthly sales:', error);
      return [];
    }
  };
  