import axios from "axios";

const HEADER_BEARER = "BEARER";

class Client {
  token = "";
  client = axios.create({
    baseURL: "http://localhost:8065/api/v4",
    headers: {
      "Content-Type": "application/json",
    },
  });

  setToken(token) {
    this.token = token;
  }

  doFetch = ({ url, method, data }) => {
    const headers = {};
    if (this.token) {
      headers["Authorization"] = `${HEADER_BEARER} ${this.token}`;
    }

    return this.client({ url, method, data, headers });
  };
}

var client = new Client();
export default client;
