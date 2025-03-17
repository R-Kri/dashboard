const API_BASE_URL = "https://dashboard-server-sable.vercel.app";

export const fetchData = async () => {
  const response = await fetch(`${API_BASE_URL}/api/admin`);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

export default API_BASE_URL;
