/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

class SalesQuotation {
  create = async (stock: any) => {
    await axios({
      method: "post",
      url: `${API_URL}sales-quotation`,
      data: stock,
      headers: {
        LocationCode: localStorage.getItem("BizX_LocationCode"),
      },
    }).catch((e) => {
      const { message } = e.response.data;
      if (message.errorInfo) throw message.errorInfo[2];
      else throw e.message;
    });
  };

  getAll = async () => {
    const response = await axios({
      method: "get",
      url: `${API_URL}sales-quotation`,
      headers: {
        LocationCode: localStorage.getItem("BizX_LocationCode"),
      },
    }).catch((e) => {
      throw e.message;
    });
    return response.data.salesQuotations;
  };
}

export default new SalesQuotation();
