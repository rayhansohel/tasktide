import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://tasktide-server.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;


// https://tasktide-server.vercel.app 
// http://localhost:5000 