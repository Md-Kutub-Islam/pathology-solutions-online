import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL_BASEURL,
});

const emailVerify = async ({ token }) => {
  const response = await axiosClient.post("auth/emailverify", {
    token,
  });

  return response.data;
};

export default { emailVerify };
