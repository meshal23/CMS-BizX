/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

class ItemMaster {
  create = async (itemMaster: any) => {
    await axios({
      method: "post",
      url: `${API_URL}item-master`,
      data: itemMaster,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).catch((e) => {
      const { message } = e.response.data;
      if (message.errorInfo) throw message.errorInfo[2];
      else throw e.message;
    });
  };

  search = async (keyword: any) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}item-master-search/${keyword}`,
    }).catch((e) => {
      throw e.message;
    });
    return response.data.item;
  };

  posSearchWithoutStock = async (keyword: any) => {
    const response = await axios({
      method: "get",
      url: `${API_URL}item-price-search-location-without-stock/${keyword}`,
    }).catch((e) => {
      throw e.message;
    });
    return response.data.stock;
  };

  imageEdit = async (itemMaster: any) => {
    const res = await axios({
      method: "put",
      url: `${API_URL}item-image-edit`,
      data: itemMaster,
    }).catch((e) => {
      const { message } = e.response.data;
      if (message.errorInfo) throw message.errorInfo[2];
      else throw e.message;
    });
    return res.data;
  };

  imageEditFromServer = async (item: any) => {
    const res = await axios({
      method: "put",
      url: `${API_URL}item-image-edit-server`,
      data: item,
    }).catch((e) => {
      const { message } = e.response.data;
      if (message.errorInfo) throw message.errorInfo[2];
      else throw e.message;
    });

    return res.data;
  };

  getAll = async () => {
    const response = await axios({
      method: "get",
      url: `${API_URL}item-master`,
    }).catch((e) => {
      throw e.message;
    });
    return response.data.items;
  };
}

export default new ItemMaster();
