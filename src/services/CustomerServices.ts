/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

class Customer {
  create = async (values: any) => {
    const res = await axios({
      method: "post",
      url: `${API_URL}customer`,
      data: values,
    }).catch((e) => {
      const { message } = e.response.data;
      if (message.errorInfo) throw message.errorInfo[2];
      else throw e.message;
    });

    return res.data;
  };

  search = async (keyword: any) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}customer-search/${keyword}`,
    }).catch((e) => {
      throw e.message;
    });
    return response.data.customer;
  };

  getAll = async () => {
    const response = await axios({
      method: "get",
      url: `${API_URL}customer`,
    }).catch((e) => {
      throw e.message;
    });
    return response.data.customer;
  };
}

export default new Customer();
