import axios from "axios";
import { apiEndpoint } from "./ApiElements";

const sendRequest = async (
  dataObj,
  method = "GET",
  endPoint = apiEndpoint,
  headers = { "Content-Type": "application/json" }
) => {
  try {
    if (dataObj.hasOwnProperty("method")) {
      method = dataObj["method"];
      delete dataObj.method;
    }
    if (method === "GET" && Object.keys(dataObj).length > 0) {
      let queryString = "";
      for (const key in dataObj) {
        if (Array.isArray(dataObj[key])) {
          // For array values, add each element as a separate parameter with the same key
          dataObj[key].forEach((value) => {
            queryString += `${key}[]=${encodeURIComponent(value)}&`;
          });
        } else {
          // Convert non-array values to query string format
          queryString += `${key}=${encodeURIComponent(dataObj[key])}&`;
        }
      }
      // Remove the trailing '&' if it exists
      queryString = queryString.slice(0, -1);
      endPoint += `?${queryString}`;
    }
    const response = await axios({
      method: method,
      url: endPoint,
      headers: headers,
      data: method !== "GET" ? dataObj : undefined, // Data is sent in the request body for non-GET requests
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export { sendRequest };
