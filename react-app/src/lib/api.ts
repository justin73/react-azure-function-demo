import axios from "axios";

export const getFunctionResponse = async (name: string) => {
  const response = await axios.get(
    `https://myazurefunctionapp0616.azurewebsites.net/api/httptrigger1`,
    {
      params: { name },
    }
  );
  return response.data;
};
