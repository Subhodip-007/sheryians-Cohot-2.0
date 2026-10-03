import axios from "axios";

const instance = axios.create({
  baseURL: "https://dummyjson.com/",
});

// Set request and response interceptors
instance.interceptors.request.use(
  function (config) {
    // Do something before the request is sent
    console.log("request ----->", config);
    
    return config;
  },
  function (error) {
    // Do something with the request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code within the range of 2xx triggers this function
    console.log("response ----->" ,response);
    return response;
  },
  function (error) {
    // Any status codes outside the range of 2xx trigger this function
    return Promise.reject(error);
  }
);

export default instance;
