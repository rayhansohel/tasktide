import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://tasktide-app.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
