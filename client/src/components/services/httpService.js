import axios from "axios";

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    <div className="toast toast-top toast-end">
      <div className="alert ">
        <span>{error.response}</span>
      </div>
      {/* <div className="alert alert-success">
        <span>Message sent successfully.</span>
      </div> */}
    </div>;
  }
  return Promise.reject(error);
});

export default http;
