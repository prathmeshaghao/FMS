import api from "./axios";

export const getGenders = async () => {
  const response = await api.get("/genders");
  return response.data.data;
};
