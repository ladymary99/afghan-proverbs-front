import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllProverbs = async (category = null) => {
  try {
    const url = category ? `/proverbs?category=${category}` : "/proverbs";
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching proverbs:", error);
    throw error;
  }
};

export const getProverbById = async (id) => {
  try {
    const response = await api.get(`/proverbs/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching proverb by ID:", error);
    throw error;
  }
};

export const createProverb = async (proverbData) => {
  try {
    const response = await api.post("/proverbs", proverbData);
    return response.data;
  } catch (error) {
    console.error("Error creating proverb:", error);
    throw error;
  }
};

export const updateProverb = async (id, proverbData) => {
  try {
    const response = await api.put(`/proverbs/${id}`, proverbData);
    return response.data;
  } catch (error) {
    console.error("Error updating proverb:", error);
    throw error;
  }
};

export const deleteProverb = async (id) => {
  try {
    const response = await api.delete(`/proverbs/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting proverb:", error);
    throw error;
  }
};

export const getRandomProverb = async () => {
  try {
    const response = await api.get("/proverbs/random");
    return response.data;
  } catch (error) {
    console.error("Error fetching random proverb:", error);
    throw error;
  }
};
